# Migration vers Supabase Auth - Documentation

## Vue d'ensemble

Ce document décrit la migration complète de l'authentification Manus OAuth vers Supabase Auth pour le projet NkriDari Lite PMS.

## Changements effectués

### 1. Authentification

#### Avant (Manus OAuth)
- Authentification via `/api/oauth/callback`
- Session cookie gérée par le serveur
- Hook `useAuth()` pour récupérer l'utilisateur connecté

#### Après (Supabase Auth)
- Authentification via `supabase.auth.signInWithPassword()`
- Session gérée par Supabase (localStorage + cookies)
- Hook `useSupabaseAuth()` pour récupérer l'utilisateur connecté
- Page de login personnalisée à `/login`

### 2. Gestion du tenant_id

#### Problème initial
- Table `utilisateurs` séparée avec politiques RLS créait une récursion infinie
- Le `tenant_id` n'était pas accessible via le JWT

#### Solution implémentée
1. **Stockage dans user_metadata** : Le `tenant_id` est stocké directement dans `auth.users.raw_user_meta_data`
2. **Fonction PostgreSQL** : Création de `public.get_user_tenant_id()` qui récupère le `tenant_id` depuis `auth.users`
3. **Hook useSupabase** : Lit le `tenant_id` depuis `user.user_metadata.tenant_id`

### 3. Politiques RLS (Row Level Security)

Toutes les tables utilisent maintenant des politiques RLS basées sur `public.get_user_tenant_id()` :

```sql
-- Fonction pour récupérer le tenant_id de l'utilisateur connecté
CREATE OR REPLACE FUNCTION public.get_user_tenant_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
  SELECT (raw_user_meta_data->>'tenant_id')::uuid
  FROM auth.users
  WHERE id = auth.uid();
$$;

-- Exemple de politique RLS pour la table properties
CREATE POLICY "tenant_select_properties"
ON properties FOR SELECT
TO public
USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "tenant_insert_properties"
ON properties FOR INSERT
TO public
WITH CHECK (tenant_id = public.get_user_tenant_id());

CREATE POLICY "tenant_update_properties"
ON properties FOR UPDATE
TO public
USING (tenant_id = public.get_user_tenant_id())
WITH CHECK (tenant_id = public.get_user_tenant_id());

CREATE POLICY "tenant_delete_properties"
ON properties FOR DELETE
TO public
USING (tenant_id = public.get_user_tenant_id());
```

### 4. Tables concernées

Les politiques RLS ont été appliquées aux tables suivantes :
- `properties` (propriétés)
- `reservations` (réservations)
- `taches` (tâches)
- `conciergeries` (tenants)

### 5. Hooks React

#### Hook `useSupabaseAuth`
```typescript
// client/src/hooks/useSupabaseAuth.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, loading, signOut };
}
```

#### Hook `useSupabase`
```typescript
// client/src/hooks/useSupabase.ts
import { supabase } from "@/lib/supabase";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

export function useSupabase() {
  const { user, loading: authLoading } = useSupabaseAuth();
  const tenantId = user?.user_metadata?.tenant_id || null;

  return {
    supabase,
    tenantId,
    loading: authLoading,
    userId: user?.id || null,
    user,
  };
}
```

#### Hook `useAuth` (wrapper pour compatibilité)
```typescript
// client/src/hooks/useAuth.ts
import { useSupabaseAuth } from './useSupabaseAuth';

export function useAuth() {
  const { user, loading, signOut } = useSupabaseAuth();

  return {
    user: user ? {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name || user.email || '',
    } : null,
    loading,
    logout: signOut,
  };
}

export function getLoginUrl() {
  return '/login';
}
```

### 6. Composants mis à jour

Les composants suivants ont été mis à jour pour utiliser les nouveaux hooks :
- `DashboardLayoutCustom.tsx`
- `DashboardLayout.tsx`
- `Sidebar.tsx`
- `Header.tsx`
- `Login.tsx` (nouvelle page)

## Configuration requise

### Variables d'environnement

Les variables suivantes doivent être configurées :

```env
VITE_SUPABASE_URL=https://djpeuljhjwxhqstygtzl.supabase.co
VITE_SUPABASE_ANON_KEY=<votre_clé_anon>
```

### Métadonnées utilisateur

Pour qu'un utilisateur puisse accéder à l'application, son profil Supabase Auth doit contenir le `tenant_id` dans `user_metadata` :

```sql
-- Mettre à jour les métadonnées d'un utilisateur
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"tenant_id": "58c9c3f5-e7fb-4305-bda6-f25566e8e0a9"}'::jsonb
WHERE email = 'test@nkridari.com';
```

## Tests effectués

✅ **Authentification**
- Connexion avec email/password fonctionne
- Déconnexion fonctionne
- Redirection vers `/login` si non authentifié

✅ **Accès aux pages protégées**
- Dashboard accessible sans erreur
- Page Propriétés accessible avec création/modification
- Page Réservations accessible
- Page Tâches accessible

✅ **Politiques RLS**
- Création de propriété réussie (avec `tenant_id` correct)
- Lecture des propriétés filtrées par `tenant_id`
- Isolation des données par tenant

## Compte de test

**Email** : test@nkridari.com  
**Mot de passe** : Test123  
**Tenant ID** : 58c9c3f5-e7fb-4305-bda6-f25566e8e0a9  
**Tenant Name** : NkriDari Test

## Scripts SQL de migration

Tous les scripts SQL utilisés pour la migration sont disponibles dans :
- `supabase-migration-auth.sql` - Suppression de la table utilisateurs
- `supabase-fix-rls-policies.sql` - Création de la fonction et des politiques RLS
- `supabase-clean-rls.sql` - Nettoyage des anciennes politiques
- `supabase-apply-rls-all-tables.sql` - Application RLS à toutes les tables

## Prochaines étapes

1. ✅ Supprimer complètement les routes OAuth Manus du serveur
2. ✅ Tester la création de réservations et tâches
3. ⏳ Créer une interface d'administration pour gérer les utilisateurs et leurs `tenant_id`
4. ⏳ Implémenter l'inscription de nouveaux utilisateurs avec assignation automatique du `tenant_id`

## Notes importantes

- **SECURITY DEFINER** : La fonction `get_user_tenant_id()` utilise `SECURITY DEFINER` pour permettre l'accès à `auth.users` depuis les politiques RLS
- **JWT vs Database** : Le `tenant_id` est lu depuis `user_metadata` côté client, mais les politiques RLS le récupèrent depuis la base de données pour plus de sécurité
- **Déconnexion** : Toujours utiliser `supabase.auth.signOut()` pour déconnecter l'utilisateur correctement

## Support

Pour toute question ou problème, consulter :
- [Documentation Supabase Auth](https://supabase.com/docs/guides/auth)
- [Documentation RLS](https://supabase.com/docs/guides/auth/row-level-security)
