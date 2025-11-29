-- Script SQL pour nettoyer toutes les politiques RLS et recréer les bonnes

-- 1. Supprimer TOUTES les anciennes politiques RLS sur properties
DROP POLICY IF EXISTS "Users can delete their tenant properties" ON properties;
DROP POLICY IF EXISTS "Users can insert data for their tenant" ON properties;
DROP POLICY IF EXISTS "Users can insert own tenant properties" ON properties;
DROP POLICY IF EXISTS "Users can update their tenant properties" ON properties;
DROP POLICY IF EXISTS "Users can view their own tenant properties" ON properties;
DROP POLICY IF EXISTS "members_delete_properties" ON properties;
DROP POLICY IF EXISTS "members_insert_properties" ON properties;
DROP POLICY IF EXISTS "members_read_properties" ON properties;
DROP POLICY IF EXISTS "members_update_properties" ON properties;
DROP POLICY IF EXISTS "tenant delete properties" ON properties;
DROP POLICY IF EXISTS "tenant insert properties" ON properties;
DROP POLICY IF EXISTS "tenant read properties" ON properties;
DROP POLICY IF EXISTS "tenant update properties" ON properties;
DROP POLICY IF EXISTS "tenant_can_delete_properties" ON properties;
DROP POLICY IF EXISTS "tenant_can_insert_properties" ON properties;
DROP POLICY IF EXISTS "tenant_can_select_properties" ON properties;
DROP POLICY IF EXISTS "tenant_can_update_properties" ON properties;

-- 2. Supprimer les politiques sur app.properties (schéma différent)
DROP POLICY IF EXISTS "read_by_tenant" ON app.properties;
DROP POLICY IF EXISTS "upd_by_tenant" ON app.properties;
DROP POLICY IF EXISTS "write_by_tenant" ON app.properties;

-- 3. Créer les nouvelles politiques RLS simples utilisant public.get_user_tenant_id()

-- SELECT: Les utilisateurs peuvent voir les propriétés de leur tenant
CREATE POLICY "tenant_select_properties"
ON properties FOR SELECT
TO public
USING (tenant_id = public.get_user_tenant_id());

-- INSERT: Les utilisateurs peuvent créer des propriétés pour leur tenant
CREATE POLICY "tenant_insert_properties"
ON properties FOR INSERT
TO public
WITH CHECK (tenant_id = public.get_user_tenant_id());

-- UPDATE: Les utilisateurs peuvent modifier les propriétés de leur tenant
CREATE POLICY "tenant_update_properties"
ON properties FOR UPDATE
TO public
USING (tenant_id = public.get_user_tenant_id())
WITH CHECK (tenant_id = public.get_user_tenant_id());

-- DELETE: Les utilisateurs peuvent supprimer les propriétés de leur tenant
CREATE POLICY "tenant_delete_properties"
ON properties FOR DELETE
TO public
USING (tenant_id = public.get_user_tenant_id());
