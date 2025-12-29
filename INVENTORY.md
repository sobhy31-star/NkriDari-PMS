# INVENTORY — Cartographie du dépôt (Phase 1)

Dernière mise à jour : 2025-12-29  
Repo : `/workspace` — branche `cursor/pms-beta-launch-preparation-4a64` — commit `166f240`

## 1) Écart vs “stack” du plan

- **Plan fourni** : Frontend WeWeb, backend Supabase, automations n8n.
- **Ce dépôt** : **Frontend React 19 + Vite + Tailwind + shadcn/ui**, backend **Express + tRPC** (minimal), **Supabase** utilisé côté client (auth + DB + storage).  
  - WeWeb : **aucune trace** dans le dépôt.
  - n8n : **aucun export de workflow** dans le dépôt (voir `N8N_WORKFLOWS.md`).

## 2) Arborescence (niveau “produit”)

- **Racine**
  - `package.json` : scripts (`dev`, `build`, `test`, `check`) + dépendances (React, Supabase JS, tRPC, Tailwind, etc.)
  - `vite.config.ts`, `tsconfig.json`, `vitest.config.ts`, `.prettierrc`
  - Scripts SQL Supabase (migrations/policies) :
    - `supabase-migration-auth.sql`
    - `supabase-fix-rls-policies.sql`
    - `supabase-clean-rls.sql`
    - `supabase-apply-rls-all-tables.sql`
    - `supabase-create-service-settings.sql`
    - `supabase-create-ota-connections.sql`
  - Docs :
    - `README.md` (installation + schéma DB “référence”)
    - `SUPABASE_AUTH_MIGRATION.md` (migration auth + logique tenant_id/RLS)
    - `todo.md` (roadmap technique/produit)

- **Frontend** : `client/`
  - Entrée : `client/src/main.tsx` (React Query + tRPC client + redirection login sur erreurs tRPC)
  - Routes : `client/src/App.tsx` (Wouter)
  - Pages : `client/src/pages/*`
  - Composants : `client/src/components/*`
  - Hooks : `client/src/hooks/*`
  - i18n : `client/src/i18n/*`
  - Lib : `client/src/lib/*` (supabase client, mock data, suApiClient stub, etc.)

- **Backend** : `server/`
  - `server/_core/*` : runtime/infra (express, auth cookies legacy, oauth legacy, llm, etc.)
  - `server/routers.ts` : tRPC `auth` + `system` uniquement (feature routers “TODO”)
  - Tests : `server/*.test.ts`

- **Shared** : `shared/*`
  - `shared/supabase.types.ts` : types “observés” pour certaines tables Supabase
  - `shared/const.ts`, `shared/types.ts`, `shared/_core/errors.ts`

- **Drizzle** : `drizzle/*`
  - Présent mais **dialect MySQL** (`drizzle.config.ts`) → semble **non utilisé** pour Supabase Postgres en production.
  - À considérer comme “legacy / expérimental” tant qu’il n’y a pas d’usage effectif côté runtime.

## 3) Pages & routes (Wouter)

Déclarées dans `client/src/App.tsx` :

- `/` → `pages/Dashboard.tsx`
- `/login` → `pages/Login.tsx`
- `/properties` → `pages/PropertiesComplete.tsx` (CRUD Supabase)
- `/properties/:id` → `pages/PropertyDetail.tsx`
- `/reservations` → `pages/Reservations.tsx` (principalement données mock / preview)
- `/reservations/new` → `pages/ReservationNew.tsx`
- `/tasks` → `pages/Tasks.tsx` (placeholder)
- `/tasks/new` → `pages/TaskNew.tsx`
- `/settings` → `pages/Settings.tsx` (maquettes/placeholder sur plusieurs sections)
- `/404` + fallback → `pages/NotFound.tsx`

## 4) Composants “structurants”

- **Layout / navigation**
  - `components/DashboardLayoutNew.tsx` (layout global)
  - `components/SidebarNew.tsx` / `components/Sidebar.tsx`
  - `components/Header.tsx`
  - Contexts : `contexts/SidebarContext.tsx`, `contexts/ThemeContext.tsx`, `contexts/AppSettingsContext.tsx`

- **Modules produit**
  - Propriétés : `pages/PropertiesComplete.tsx`, `pages/PropertyDetail.tsx`, hook `hooks/useProperties.ts`
  - Réservations : `pages/Reservations.tsx` + `components/reservations/*` + `lib/mockReservations.ts`
  - Tâches : `pages/Tasks.tsx`, `pages/TaskNew.tsx` (à confirmer côté DB)
  - Paramètres : `pages/Settings.tsx` + `components/settings/*`  
    - Note : `components/settings/SettingsProfile.tsx` contient un **upload Supabase Storage** vers le bucket `public` (chemin `logos/...`).

## 5) Config/infra notables

- **Supabase client** : `client/src/lib/supabase.ts` (env `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
- **tRPC client** : `client/src/lib/trpc.ts` + init dans `main.tsx`
- **Preview mode** : `client/src/lib/mockData.ts` (utilisé par `Reservations.tsx`)

## 6) Zones “à confirmer / non présentes”

- **Workflows n8n** : non versionnés ici (aucun JSON/export détecté).
- **Supabase Edge Functions** : aucune fonction Edge dans le dépôt.
- **Buckets Storage & policies** : seul usage direct observé = bucket `public` (logos) ; policies non décrites dans le dépôt.

