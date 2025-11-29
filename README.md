# NkriDari Lite PMS

**Property Management System** pour la gestion de propriétés, réservations et tâches de conciergerie.

## 🎯 Fonctionnalités

### ✅ Implémenté

- **Authentification** : Connexion via Manus OAuth
- **Dashboard** : Vue d'ensemble avec KPI (structure prête)
- **Propriétés** : CRUD complet (liste, création, édition, archivage)
- **Réservations** : Structure prête pour implémentation
- **Tâches** : Structure prête pour implémentation
- **Paramètres** : Profil utilisateur

### 🔄 Architecture

- **Frontend** : React 19 + TypeScript + Tailwind CSS 4
- **Backend** : Express + tRPC
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Manus OAuth
- **UI** : shadcn/ui components

## 📋 Prérequis

- Node.js 18+ et pnpm
- Compte Supabase avec projet configuré
- Compte Manus pour l'authentification

## 🚀 Installation

### 1. Cloner et installer les dépendances

```bash
cd nkridari-lite-pms
pnpm install
```

### 2. Configuration des variables d'environnement

Les variables Supabase sont déjà configurées via l'interface Manus :
- `VITE_SUPABASE_URL` : URL de votre projet Supabase
- `VITE_SUPABASE_ANON_KEY` : Clé publique Supabase

Les autres variables (OAuth, JWT, etc.) sont automatiquement injectées par la plateforme Manus.

### 3. Configuration de la base de données Supabase

#### A. Créer les tables

Exécutez les requêtes SQL suivantes dans l'éditeur SQL de Supabase :

```sql
-- Table tenants
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table utilisateurs
CREATE TABLE IF NOT EXISTS utilisateurs (
  user_id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  tenant_id UUID REFERENCES tenants(id),
  role TEXT CHECK (role IN ('admin', 'manager', 'agent')) DEFAULT 'agent',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table properties
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  title TEXT NOT NULL,
  city TEXT,
  capacity INTEGER,
  status TEXT CHECK (status IN ('active', 'inactive', 'archived')) DEFAULT 'active',
  platform TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table reservations
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  property_id UUID REFERENCES properties(id) NOT NULL,
  guest_name TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  total_amount NUMERIC,
  currency TEXT DEFAULT 'MAD',
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  platform TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table tasks
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  property_id UUID REFERENCES properties(id) NOT NULL,
  title TEXT NOT NULL,
  assignee TEXT,
  due_date DATE,
  status TEXT CHECK (status IN ('open', 'in_progress', 'done', 'cancelled')) DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_properties_tenant ON properties(tenant_id);
CREATE INDEX IF NOT EXISTS idx_reservations_tenant ON reservations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_reservations_property ON reservations(property_id);
CREATE INDEX IF NOT EXISTS idx_tasks_tenant ON tasks(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tasks_property ON tasks(property_id);
CREATE INDEX IF NOT EXISTS idx_utilisateurs_tenant ON utilisateurs(tenant_id);
```

#### B. Configurer Row Level Security (RLS)

**Important** : Pour sécuriser vos données, activez RLS sur toutes les tables :

```sql
-- Activer RLS
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE utilisateurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Politiques pour properties
CREATE POLICY "Users can view own tenant properties"
ON properties FOR SELECT
USING (
  tenant_id IN (
    SELECT tenant_id FROM utilisateurs WHERE user_id = auth.uid()::text
  )
);

CREATE POLICY "Users can insert own tenant properties"
ON properties FOR INSERT
WITH CHECK (
  tenant_id IN (
    SELECT tenant_id FROM utilisateurs WHERE user_id = auth.uid()::text
  )
);

CREATE POLICY "Users can update own tenant properties"
ON properties FOR UPDATE
USING (
  tenant_id IN (
    SELECT tenant_id FROM utilisateurs WHERE user_id = auth.uid()::text
  )
);

CREATE POLICY "Users can delete own tenant properties"
ON properties FOR DELETE
USING (
  tenant_id IN (
    SELECT tenant_id FROM utilisateurs WHERE user_id = auth.uid()::text
  )
);

-- Répéter les mêmes politiques pour reservations et tasks
-- (Remplacer 'properties' par 'reservations' ou 'tasks')
```

#### C. Créer un tenant et un utilisateur de test

```sql
-- Créer un tenant
INSERT INTO tenants (name, slug) 
VALUES ('NkriDari Test', 'nkridari-test');

-- Récupérer l'ID du tenant créé
SELECT id FROM tenants WHERE slug = 'nkridari-test';

-- Créer un utilisateur (remplacer YOUR_MANUS_OPEN_ID et TENANT_ID)
INSERT INTO utilisateurs (user_id, email, full_name, tenant_id, role)
VALUES ('YOUR_MANUS_OPEN_ID', 'votre@email.com', 'Votre Nom', 'TENANT_ID', 'admin');
```

**Note** : Pour obtenir votre `MANUS_OPEN_ID`, connectez-vous à l'application et consultez les logs ou la console développeur.

### 4. Lancer l'application

```bash
pnpm dev
```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du projet

```
nkridari-lite-pms/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── DashboardLayoutCustom.tsx
│   │   │   └── ui/            # shadcn/ui components
│   │   ├── pages/             # Pages de l'application
│   │   │   ├── Dashboard.tsx
│   │   │   ├── PropertiesComplete.tsx
│   │   │   ├── Reservations.tsx
│   │   │   ├── Tasks.tsx
│   │   │   └── Settings.tsx
│   │   ├── hooks/             # Custom hooks
│   │   │   ├── useSupabase.ts
│   │   │   └── useProperties.ts
│   │   ├── lib/
│   │   │   ├── supabase.ts    # Client Supabase
│   │   │   └── trpc.ts        # Client tRPC
│   │   ├── App.tsx            # Routes
│   │   └── index.css          # Styles globaux
│   └── public/
├── server/                    # Backend Express + tRPC
│   ├── routers.ts             # Routes tRPC
│   ├── db.ts                  # Queries base de données
│   └── _core/                 # Core framework
├── shared/                    # Types partagés
│   └── supabase.types.ts      # Types Supabase
├── drizzle/                   # Schéma Drizzle (non utilisé pour Supabase)
├── todo.md                    # Suivi des fonctionnalités
└── README.md                  # Ce fichier
```

## 🎨 Charte graphique

Le design s'inspire de la charte graphique NkriDari avec :

- **Couleurs principales** :
  - Primaire : `#2C3E50` (Bleu foncé)
  - Secondaire : `#F4EDE4` (Beige clair)
  - Accent : `#E8B86D` (Or/beige)
  - Muted : `#95A5A6` (Gris)

- **Typographie** : Inter (Google Fonts)
- **Radius** : 0.5rem
- **Ombres** : Douces et subtiles

## 📊 Modules

### 1. Dashboard

**Statut** : Structure prête, KPI à implémenter

**KPI affichés** :
- Réservations du mois
- Taux d'occupation
- Revenus du mois
- Tâches en attente

**Graphiques** :
- Graphique d'occupation (12 derniers mois)
- Graphique de revenus (12 derniers mois)
- Activité récente

### 2. Propriétés

**Statut** : ✅ CRUD complet implémenté

**Fonctionnalités** :
- ✅ Liste des propriétés avec tableau
- ✅ Création de propriété (formulaire modal)
- ✅ Édition de propriété
- ✅ Archivage de propriété (soft delete)
- ✅ Filtrage par statut (badge coloré)
- ✅ Intégration Supabase complète

**Champs** :
- Nom de la propriété (requis)
- Ville
- Capacité (nombre de personnes)
- Statut (active, inactive, archived)
- Plateforme (Airbnb, Booking.com, etc.)

### 3. Réservations

**Statut** : Structure prête, à implémenter

**Fonctionnalités prévues** :
- Liste des réservations avec filtres
- Création de réservation
- Édition de réservation
- Annulation de réservation
- Vérification des conflits de dates

**Champs** :
- Propriété (select)
- Nom du client
- Check-in / Check-out
- Montant total
- Devise
- Statut (pending, confirmed, cancelled, completed)
- Plateforme

### 4. Tâches

**Statut** : Structure prête, à implémenter

**Fonctionnalités prévues** :
- Liste des tâches avec filtres
- Création de tâche
- Édition de tâche
- Changement de statut rapide
- Assignation

**Champs** :
- Titre
- Propriété (select)
- Assigné à
- Date d'échéance
- Statut (open, in_progress, done, cancelled)

### 5. Paramètres

**Statut** : Lecture seule implémentée

**Sections** :
- Profil utilisateur (nom, email, rôle)
- Informations du tenant (à implémenter)

## 🔧 Développement

### Commandes disponibles

```bash
# Développement
pnpm dev              # Lancer le serveur de développement

# Build
pnpm build            # Compiler pour la production

# Tests
pnpm test             # Exécuter les tests Vitest

# Base de données
pnpm db:push          # Pousser les migrations Drizzle (non utilisé avec Supabase)

# Qualité du code
pnpm check            # Vérifier TypeScript
pnpm format           # Formater le code avec Prettier
```

### Ajouter un nouveau module

1. Créer le hook dans `client/src/hooks/useModuleName.ts`
2. Créer la page dans `client/src/pages/ModuleName.tsx`
3. Ajouter la route dans `client/src/App.tsx`
4. Ajouter l'entrée dans la Sidebar (`client/src/components/Sidebar.tsx`)

### Intégration Supabase

Le hook `useSupabase` gère automatiquement :
- La récupération du `tenant_id` de l'utilisateur
- Le filtrage automatique par tenant
- La gestion des erreurs

Exemple d'utilisation :

```typescript
import { useSupabase } from "@/hooks/useSupabase";

function MyComponent() {
  const { supabase, tenantId, loading } = useSupabase();

  useEffect(() => {
    if (!tenantId) return;

    async function fetchData() {
      const { data } = await supabase
        .from('my_table')
        .select('*')
        .eq('tenant_id', tenantId);
    }

    fetchData();
  }, [tenantId]);
}
```

## 🐛 Dépannage

### Erreur de connexion Supabase

**Problème** : `Could not find the table 'public.xxx' in the schema cache`

**Solution** : Vérifiez que :
1. Les tables sont créées dans Supabase
2. RLS est configuré correctement
3. Les clés Supabase sont correctes dans les variables d'environnement

### Utilisateur non trouvé

**Problème** : `tenant_id` est null

**Solution** : Créez un utilisateur dans la table `utilisateurs` avec votre `openId` Manus :

```sql
INSERT INTO utilisateurs (user_id, email, full_name, tenant_id, role)
VALUES ('YOUR_MANUS_OPEN_ID', 'email@example.com', 'Nom', 'TENANT_ID', 'admin');
```

### Erreurs TypeScript

**Problème** : Erreurs de typage avec Supabase

**Solution** : Les types Supabase sont définis dans `shared/supabase.types.ts`. Le client utilise des types permissifs (`as any`) pour éviter les conflits.

## 📝 TODO

Voir le fichier `todo.md` pour la liste complète des fonctionnalités à implémenter.

**Priorités** :
1. ✅ Module Propriétés (TERMINÉ)
2. 🔄 Module Réservations (hooks + pages)
3. 🔄 Module Tâches (hooks + pages)
4. 🔄 Dashboard avec KPI réels
5. 🔄 Graphiques (Recharts)
6. 🔄 Tests unitaires

## 📚 Documentation

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/docs)
- [tRPC](https://trpc.io/)
- [Manus Platform](https://manus.im)

## 📄 Licence

MIT

## 👥 Équipe

Développé pour NkriDari - Property Management System

---

**Version** : 1.0.0  
**Dernière mise à jour** : 27 novembre 2025
