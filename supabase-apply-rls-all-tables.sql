-- Script SQL pour appliquer les politiques RLS à toutes les tables

-- ============================================
-- TABLE: reservations
-- ============================================

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "tenant_select_reservations" ON reservations;
DROP POLICY IF EXISTS "tenant_insert_reservations" ON reservations;
DROP POLICY IF EXISTS "tenant_update_reservations" ON reservations;
DROP POLICY IF EXISTS "tenant_delete_reservations" ON reservations;

-- Créer les nouvelles politiques
CREATE POLICY "tenant_select_reservations"
ON reservations FOR SELECT
TO public
USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "tenant_insert_reservations"
ON reservations FOR INSERT
TO public
WITH CHECK (tenant_id = public.get_user_tenant_id());

CREATE POLICY "tenant_update_reservations"
ON reservations FOR UPDATE
TO public
USING (tenant_id = public.get_user_tenant_id())
WITH CHECK (tenant_id = public.get_user_tenant_id());

CREATE POLICY "tenant_delete_reservations"
ON reservations FOR DELETE
TO public
USING (tenant_id = public.get_user_tenant_id());

-- Activer RLS
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- ============================================
-- TABLE: taches
-- ============================================

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "tenant_select_taches" ON taches;
DROP POLICY IF EXISTS "tenant_insert_taches" ON taches;
DROP POLICY IF EXISTS "tenant_update_taches" ON taches;
DROP POLICY IF EXISTS "tenant_delete_taches" ON taches;

-- Créer les nouvelles politiques
CREATE POLICY "tenant_select_taches"
ON taches FOR SELECT
TO public
USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "tenant_insert_taches"
ON taches FOR INSERT
TO public
WITH CHECK (tenant_id = public.get_user_tenant_id());

CREATE POLICY "tenant_update_taches"
ON taches FOR UPDATE
TO public
USING (tenant_id = public.get_user_tenant_id())
WITH CHECK (tenant_id = public.get_user_tenant_id());

CREATE POLICY "tenant_delete_taches"
ON taches FOR DELETE
TO public
USING (tenant_id = public.get_user_tenant_id());

-- Activer RLS
ALTER TABLE taches ENABLE ROW LEVEL SECURITY;

-- ============================================
-- TABLE: conciergeries
-- ============================================

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "tenant_select_conciergeries" ON conciergeries;
DROP POLICY IF EXISTS "tenant_insert_conciergeries" ON conciergeries;
DROP POLICY IF EXISTS "tenant_update_conciergeries" ON conciergeries;
DROP POLICY IF EXISTS "tenant_delete_conciergeries" ON conciergeries;

-- Créer les nouvelles politiques
CREATE POLICY "tenant_select_conciergeries"
ON conciergeries FOR SELECT
TO public
USING (id = public.get_user_tenant_id());

CREATE POLICY "tenant_insert_conciergeries"
ON conciergeries FOR INSERT
TO public
WITH CHECK (id = public.get_user_tenant_id());

CREATE POLICY "tenant_update_conciergeries"
ON conciergeries FOR UPDATE
TO public
USING (id = public.get_user_tenant_id())
WITH CHECK (id = public.get_user_tenant_id());

CREATE POLICY "tenant_delete_conciergeries"
ON conciergeries FOR DELETE
TO public
USING (id = public.get_user_tenant_id());

-- Activer RLS
ALTER TABLE conciergeries ENABLE ROW LEVEL SECURITY;
