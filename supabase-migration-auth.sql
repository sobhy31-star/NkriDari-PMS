-- Migration vers Supabase Auth pur (sans table utilisateurs)
-- Ce script supprime la table utilisateurs et met à jour les politiques RLS
-- pour utiliser directement auth.uid() et user_metadata.tenant_id

-- 1. Supprimer les politiques RLS existantes qui dépendent de la table utilisateurs
DROP POLICY IF EXISTS "Users can view own tenant properties" ON properties;
DROP POLICY IF EXISTS "Users can insert own tenant properties" ON properties;
DROP POLICY IF EXISTS "Users can update own tenant properties" ON properties;
DROP POLICY IF EXISTS "Users can delete own tenant properties" ON properties;

DROP POLICY IF EXISTS "Users can view own tenant reservations" ON reservations;
DROP POLICY IF EXISTS "Users can insert own tenant reservations" ON reservations;
DROP POLICY IF EXISTS "Users can update own tenant reservations" ON reservations;
DROP POLICY IF EXISTS "Users can delete own tenant reservations" ON reservations;

DROP POLICY IF EXISTS "Users can view own tenant tasks" ON tasks;
DROP POLICY IF EXISTS "Users can insert own tenant tasks" ON tasks;
DROP POLICY IF EXISTS "Users can update own tenant tasks" ON tasks;
DROP POLICY IF EXISTS "Users can delete own tenant tasks" ON tasks;

-- 2. Supprimer l'index sur utilisateurs
DROP INDEX IF EXISTS idx_utilisateurs_tenant;

-- 3. Supprimer la table utilisateurs
DROP TABLE IF EXISTS utilisateurs CASCADE;

-- 4. Créer de nouvelles politiques RLS simples basées sur user_metadata.tenant_id
-- Note: Le tenant_id doit être stocké dans auth.users.raw_user_meta_data->>'tenant_id'

-- Politiques pour properties
CREATE POLICY "Users can view own tenant properties"
ON properties FOR SELECT
USING (
  tenant_id::text = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

CREATE POLICY "Users can insert own tenant properties"
ON properties FOR INSERT
WITH CHECK (
  tenant_id::text = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

CREATE POLICY "Users can update own tenant properties"
ON properties FOR UPDATE
USING (
  tenant_id::text = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

CREATE POLICY "Users can delete own tenant properties"
ON properties FOR DELETE
USING (
  tenant_id::text = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

-- Politiques pour reservations
CREATE POLICY "Users can view own tenant reservations"
ON reservations FOR SELECT
USING (
  tenant_id::text = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

CREATE POLICY "Users can insert own tenant reservations"
ON reservations FOR INSERT
WITH CHECK (
  tenant_id::text = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

CREATE POLICY "Users can update own tenant reservations"
ON reservations FOR UPDATE
USING (
  tenant_id::text = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

CREATE POLICY "Users can delete own tenant reservations"
ON reservations FOR DELETE
USING (
  tenant_id::text = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

-- Politiques pour tasks
CREATE POLICY "Users can view own tenant tasks"
ON tasks FOR SELECT
USING (
  tenant_id::text = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

CREATE POLICY "Users can insert own tenant tasks"
ON tasks FOR INSERT
WITH CHECK (
  tenant_id::text = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

CREATE POLICY "Users can update own tenant tasks"
ON tasks FOR UPDATE
USING (
  tenant_id::text = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

CREATE POLICY "Users can delete own tenant tasks"
ON tasks FOR DELETE
USING (
  tenant_id::text = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

-- 5. Politiques pour tenants (lecture seule pour les utilisateurs authentifiés)
CREATE POLICY "Users can view own tenant"
ON tenants FOR SELECT
USING (
  id::text = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')
);

-- Note importante :
-- Pour ajouter le tenant_id aux métadonnées d'un utilisateur existant,
-- utilisez la console Supabase ou exécutez :
-- 
-- UPDATE auth.users
-- SET raw_user_meta_data = raw_user_meta_data || '{"tenant_id": "VOTRE_TENANT_ID"}'::jsonb
-- WHERE email = 'test@nkridari.com';
