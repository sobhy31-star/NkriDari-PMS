# SUPABASE_MAP — Cartographie Supabase (Phase 1)

Dernière mise à jour : 2025-12-29

## 0) Sources utilisées (preuve / traçabilité)

- **Scripts SQL dans le dépôt** :
  - `supabase-migration-auth.sql`
  - `supabase-fix-rls-policies.sql`
  - `supabase-clean-rls.sql`
  - `supabase-apply-rls-all-tables.sql`
  - `supabase-create-service-settings.sql`
  - `supabase-create-ota-connections.sql`
- **Types “observés”** : `shared/supabase.types.ts`
- **Usage côté client** :
  - CRUD properties : `client/src/hooks/useProperties.ts`
  - Auth + tenantId : `client/src/hooks/useSupabaseAuth.ts`, `client/src/hooks/useSupabase.ts`
  - Storage : `client/src/components/settings/SettingsProfile.tsx`

## 1) Vue d’ensemble (multi-tenant)

- **Tenant isolation** : via `tenant_id` sur la plupart des tables “métier”.
- **Source du tenant_id** : attendu dans `auth.users.raw_user_meta_data.tenant_id` (et donc dans `user.user_metadata.tenant_id` côté client).

## 2) Tables (certaines) + colonnes clés

### 2.1 Tables confirmées par `shared/supabase.types.ts`

#### `public.tenants`
- **Colonnes** : `id (uuid)`, `name (text)`, `slug (text unique)`, `created_at`, `updated_at`
- **Rôle** : entité tenant (organisation / conciergerie)

#### `public.properties`
- **Colonnes** : `id (uuid)`, `tenant_id (uuid)`, `title`, `city`, `capacity`, `status`, `platform`, `created_at`, `updated_at`
- **Relations** : `tenant_id` → `tenants.id` (selon README)
- **Index** (README) : `idx_properties_tenant (tenant_id)`

#### `public.reservations`
- **Colonnes** : `id (uuid)`, `tenant_id (uuid)`, `property_id (uuid)`, `guest_name`, `check_in`, `check_out`, `total_amount`, `currency`, `status`, `platform`, `created_at`
- **Relations** : `property_id` → `properties.id`, `tenant_id` → `tenants.id` (selon README)
- **Index** (README) : `idx_reservations_tenant (tenant_id)`, `idx_reservations_property (property_id)`

#### `public.tasks`
- **Colonnes** : `id (uuid)`, `tenant_id (uuid)`, `property_id (uuid)`, `title`, `assignee`, `due_date`, `status`, `created_at`
- **Relations** : `property_id` → `properties.id`, `tenant_id` → `tenants.id` (selon README)
- **Index** (README) : `idx_tasks_tenant (tenant_id)`, `idx_tasks_property (property_id)`

#### `public.utilisateurs` (⚠️ incohérence à surveiller)
- Présent dans `shared/supabase.types.ts` **et** dans le schéma “initial” du `README.md`.
- **Mais** `supabase-migration-auth.sql` fait `DROP TABLE IF EXISTS utilisateurs CASCADE;`
- Conclusion (Phase 1) :
  - soit la table a été supprimée en prod mais les types ne sont pas à jour,
  - soit la migration n’a pas été appliquée partout.

### 2.2 Tables confirmées par scripts SQL (mais absentes des types)

#### `public.service_settings` (script : `supabase-create-service-settings.sql`)
- **Colonnes** : `id (uuid)`, `tenant_id (uuid)`, `service_name (text)`, `device_id (text)`, `device_type (text)`,
  `checkin_time (time)`, `checkout_time (time)`, `config (jsonb)`, `active (bool)`, `created_at`, `updated_at`
- **Unique** : `(tenant_id, service_name, device_id)`
- **Usage produit** : “Services connectés” (Settings) — aujourd’hui stocké en localStorage dans `SettingsServices.tsx` (TODO : persister ici)

#### `public.ota_connections` (script : `supabase-create-ota-connections.sql`)
- **Colonnes** : `id (uuid)`, `tenant_id (uuid)`, `platform (text)`, `connection_type (text)`,
  `su_api_account_id (text)`, `su_api_property_id (text)`, `status (text)`, `error_message (text)`, `config (jsonb)`,
  `created_at`, `updated_at`
- **Unique** : `(tenant_id, platform, su_api_property_id)`
- **Usage produit** : “connexions OTA / channel manager” (SU-API, iCal, direct…)

### 2.3 Tables mentionnées par scripts mais non définies dans ce dépôt (⚠️ legacy probable)

`supabase-apply-rls-all-tables.sql` référence :
- `public.taches`
- `public.conciergeries`

Ces tables **ne sont pas créées** par les scripts présents, et **ne figurent pas** dans `shared/supabase.types.ts`.
Hypothèse : ancien schéma (FR) remplacé progressivement par `tasks` / `tenants`.

## 3) Fonctions (tenant resolution) — incohérences à noter

Le dépôt contient **plusieurs variantes** de fonction/pattern :

### Variante A (documentée) : `public.get_user_tenant_id()`
Documentée dans `SUPABASE_AUTH_MIGRATION.md` (avec `SECURITY DEFINER`) et utilisée dans :
- `supabase-clean-rls.sql` (policies `tenant_*_properties`)
- `supabase-apply-rls-all-tables.sql` (policies `tenant_*` sur plusieurs tables)
- `supabase-create-service-settings.sql` / `supabase-create-ota-connections.sql`

### Variante B (script) : `auth.get_user_tenant_id()`
Créée dans `supabase-fix-rls-policies.sql` puis utilisée par des policies “Users can …”.

### Variante C (JWT direct)
`supabase-migration-auth.sql` compare `tenant_id::text` à `(auth.jwt()->'user_metadata'->>'tenant_id')`.

**Conclusion Phase 1** : il faut considérer qu’il existe (ou a existé) plusieurs itérations.
Pour une bêta stable, il faudra **standardiser** (mais ce n’est pas fait en Phase 1).

## 4) RLS (Row Level Security) — état cartographié “par scripts”

> Important : la présence de policies dans le dépôt ne garantit pas leur déploiement effectif. Ceci est une cartographie “code → intention”.

### 4.1 `properties`
Vu dans `supabase-clean-rls.sql` :
- `tenant_select_properties` (SELECT) : `tenant_id = public.get_user_tenant_id()`
- `tenant_insert_properties` (INSERT) : `WITH CHECK (tenant_id = public.get_user_tenant_id())`
- `tenant_update_properties` (UPDATE) : `USING (...) WITH CHECK (...)`
- `tenant_delete_properties` (DELETE) : `USING (...)`

Vu dans `supabase-fix-rls-policies.sql` :
- policies “Users can view/insert/update/delete own tenant properties” basées sur `auth.get_user_tenant_id()`

Vu dans `supabase-migration-auth.sql` :
- policies “Users can …” basées sur `auth.jwt()->user_metadata.tenant_id`

### 4.2 `reservations`
Vu dans `supabase-apply-rls-all-tables.sql` :
- `tenant_select_reservations`, `tenant_insert_reservations`, `tenant_update_reservations`, `tenant_delete_reservations`
  basées sur `public.get_user_tenant_id()`
  + `ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;`

### 4.3 `tasks` vs `taches` (⚠️ divergence)
- `supabase-migration-auth.sql` / `supabase-fix-rls-policies.sql` ciblent `tasks`
- `supabase-apply-rls-all-tables.sql` cible `taches`

### 4.4 `tenants` / `conciergeries`
- `supabase-migration-auth.sql` ajoute une policy SELECT sur `tenants`
- `supabase-apply-rls-all-tables.sql` cible `conciergeries` (id = tenant)

### 4.5 `service_settings`
Dans `supabase-create-service-settings.sql` :
- RLS activé + policies CRUD basées sur `public.get_user_tenant_id()`
- **Note de cohérence** : le script compare `tenant_id::text = public.get_user_tenant_id()` alors que la fonction est typée `uuid` dans la doc → ce détail est à revérifier en environnement réel.

### 4.6 `ota_connections`
Même logique que `service_settings` (RLS CRUD).

## 5) Storage (buckets)

Usage détecté :
- `SettingsProfile.tsx` upload vers `supabase.storage.from("public").upload(...)`
  - chemin : `logos/<tenantId>-logo-<timestamp>.<ext>`
  - récupération URL : `getPublicUrl(filePath)`

Cartographie (Phase 1) :
- **Bucket** : `public`
- **Répertoire logique** : `logos/`
- **Policies storage** : non décrites dans ce dépôt (à auditer côté Supabase)

## 6) Edge Functions (Supabase)

- **Aucune Edge Function** détectée dans ce dépôt.

