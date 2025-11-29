-- Script SQL pour corriger les politiques RLS
-- Utilise une fonction PostgreSQL pour récupérer le tenant_id depuis auth.users

-- 1. Créer une fonction pour récupérer le tenant_id de l'utilisateur connecté
CREATE OR REPLACE FUNCTION auth.get_user_tenant_id()
RETURNS uuid
LANGUAGE sql
STABLE
AS $$
  SELECT (raw_user_meta_data->>'tenant_id')::uuid
  FROM auth.users
  WHERE id = auth.uid();
$$;

-- 2. Supprimer les anciennes politiques RLS
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

-- 3. Créer de nouvelles politiques RLS utilisant la fonction get_user_tenant_id()

-- Politiques pour properties
CREATE POLICY "Users can view own tenant properties"
ON properties FOR SELECT
USING (
  tenant_id = auth.get_user_tenant_id()
);

CREATE POLICY "Users can insert own tenant properties"
ON properties FOR INSERT
WITH CHECK (
  tenant_id = auth.get_user_tenant_id()
);

CREATE POLICY "Users can update own tenant properties"
ON properties FOR UPDATE
USING (
  tenant_id = auth.get_user_tenant_id()
);

CREATE POLICY "Users can delete own tenant properties"
ON properties FOR DELETE
USING (
  tenant_id = auth.get_user_tenant_id()
);

-- Politiques pour reservations
CREATE POLICY "Users can view own tenant reservations"
ON reservations FOR SELECT
USING (
  tenant_id = auth.get_user_tenant_id()
);

CREATE POLICY "Users can insert own tenant reservations"
ON reservations FOR INSERT
WITH CHECK (
  tenant_id = auth.get_user_tenant_id()
);

CREATE POLICY "Users can update own tenant reservations"
ON reservations FOR UPDATE
USING (
  tenant_id = auth.get_user_tenant_id()
);

CREATE POLICY "Users can delete own tenant reservations"
ON reservations FOR DELETE
USING (
  tenant_id = auth.get_user_tenant_id()
);

-- Politiques pour tasks
CREATE POLICY "Users can view own tenant tasks"
ON tasks FOR SELECT
USING (
  tenant_id = auth.get_user_tenant_id()
);

CREATE POLICY "Users can insert own tenant tasks"
ON tasks FOR INSERT
WITH CHECK (
  tenant_id = auth.get_user_tenant_id()
);

CREATE POLICY "Users can update own tenant tasks"
ON tasks FOR UPDATE
USING (
  tenant_id = auth.get_user_tenant_id()
);

CREATE POLICY "Users can delete own tenant tasks"
ON tasks FOR DELETE
USING (
  tenant_id = auth.get_user_tenant_id()
);
