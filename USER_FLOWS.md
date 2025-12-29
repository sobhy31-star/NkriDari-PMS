# USER_FLOWS — Parcours utilisateurs (Phase 1)

Légende : ✅ Fonctionnel — ⚠️ Partiellement fonctionnel — ❌ Cassé / non implémenté  
Dernière mise à jour : 2025-12-29

## 1) Personas cibles (pour la bêta)

- **Propriétaire individuel** : 1 tenant, quelques biens, besoin “simple”.
- **Conciergerie** : 1 tenant (ou multi-tenant à venir), plusieurs biens + équipe + automatisations.

## 2) Onboarding & Auth

### 2.1 Accès / login (/login)
- **Se connecter (email/password)** : ✅
  - Implémentation : `pages/Login.tsx` via `useSupabaseAuth().signIn()`
- **Créer un compte (signup)** : ⚠️
  - L’inscription existe (`signUp`) mais **l’assignation du `tenant_id`** dans `user_metadata` n’est pas automatisée dans le dépôt.
- **Pré-requis critique** : ⚠️
  - Beaucoup d’accès DB supposent `user.user_metadata.tenant_id` (voir `useSupabase.ts`).

### 2.2 Déconnexion
- **Logout** : ✅
  - `SidebarNew.tsx` appelle `supabase.auth.signOut()` puis redirige vers `/login`.

### 2.3 Protection des pages
- **Garde de route “front”** : ⚠️
  - `App.tsx` ne bloque pas explicitement les routes si non connecté.
  - La redirection auto vers `/login` ne s’applique que sur erreurs tRPC (et la plupart des pages utilisent Supabase direct).

## 3) Parcours “Daily Management”

### 3.1 Dashboard (/)
- **Accès & rendu UI** : ✅
  - `pages/Dashboard.tsx` affiche KPI + graphiques + calendrier.
- **Données réelles** : ⚠️
  - KPI/graphiques sont **mockés** (pas de requêtes Supabase observées ici).

### 3.2 Propriétés (CRUD) (/properties)
- **Lister** : ✅ (Supabase)
- **Créer** : ✅ (Supabase)
- **Modifier** : ✅ (Supabase)
- **Archiver (soft delete via status=archived)** : ✅ (Supabase)
  - Implémentation : `hooks/useProperties.ts`, page `pages/PropertiesComplete.tsx`.

### 3.3 Détail propriété (/properties/:id)
- **Afficher la fiche** : ✅ (UI)
- **Persistance des modifications** : ❌
  - `pages/PropertyDetail.tsx` est majoritairement **mock** (`// TODO: Charger depuis Supabase`) et “Enregistrer” ne persiste pas.

### 3.4 Réservations (/reservations)
- **Vue analytique + tableaux** : ⚠️
  - `pages/Reservations.tsx` utilise `mockReservations` en “preview mode”, sinon liste vide.
- **Création réservation (/reservations/new)** : ❌
  - `pages/ReservationNew.tsx` : `// TODO: Implémenter la création avec Supabase` (mock seulement).

### 3.5 Tâches (/tasks)
- **Liste** : ❌
  - `pages/Tasks.tsx` : `// TODO: Implémenter la liste avec Supabase` (placeholder).
- **Création (/tasks/new)** : ❌
  - `pages/TaskNew.tsx` : `// TODO: Implémenter la création avec Supabase` (mock seulement).

## 4) Parcours “Intégrations & Automatisation”

### 4.1 Services tiers (Paramètres → Services)
- **UI configuration** : ⚠️
  - `components/settings/SettingsServices.tsx` stocke en **localStorage** (`service_configs`).
- **Persistance DB prévue** : ⚠️
  - Table `service_settings` existe en script (`supabase-create-service-settings.sql`) mais n’est pas utilisée par le code.

### 4.2 Connexions OTA / Channel manager
- **Table prévue** : ⚠️ (`ota_connections` via script SQL)
- **UI / flux complet** : ⚠️/❌
  - Le dépôt contient des indices (Settings Platforms / SU-API stubs) mais pas un flux “connect + sync” complet.

### 4.3 n8n / Make
- **Workflows actifs** : ❌ (non cartographiables depuis ce repo)
  - Voir `N8N_WORKFLOWS.md`.

## 5) Parcours “Paramètres”

> Attention : `/settings` pointe vers `pages/Settings.tsx` (maquettes, beaucoup de champs désactivés).
> Une version plus aboutie existe : `pages/SettingsNew.tsx` (avec sous-composants), mais **n’est pas routée** actuellement.

### 5.1 Profil
- **Version active (/settings)** : ⚠️ (lecture/maquette)
- **Version “SettingsNew” (non activée)** : ⚠️
  - `SettingsProfile.tsx` inclut :
    - **upload logo** Supabase Storage (bucket `public`) : ⚠️ (dépend des policies storage)
    - **préférences devise/langue** via `AppSettingsContext` : ✅ côté UI
    - le reste (“profil DB”) : ❌ (TODO)

### 5.2 Équipe
- **/settings** : ⚠️ (maquette “teamMembers” hardcodée)
- **persistence DB** : ❌

## 6) Notes de risque (pour Phase 2)

- **Blocage potentiel P0** : utilisateurs sans `tenant_id` dans `user_metadata` → accès DB/RLS cassé.
- **Schéma DB “mix”** : coexistence possible `tasks` vs `taches`, `tenants` vs `conciergeries`, `utilisateurs` vs user_metadata.
- **Réservations/Tâches** : UI présente mais opérations DB non implémentées (risque “boutons inactifs”).

