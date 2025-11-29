-- Migration: Créer la table service_settings pour stocker les configurations des services tiers
-- Date: 28 novembre 2025
-- À exécuter dans Supabase SQL Editor

CREATE TABLE IF NOT EXISTS service_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  service_name TEXT NOT NULL,
  device_id TEXT,
  device_type TEXT,
  checkin_time TIME,
  checkout_time TIME,
  config JSONB,
  active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, service_name, device_id)
);

-- RLS policies
ALTER TABLE service_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY service_settings_select ON service_settings FOR SELECT 
  USING (tenant_id::text = public.get_user_tenant_id());

CREATE POLICY service_settings_insert ON service_settings FOR INSERT 
  WITH CHECK (tenant_id::text = public.get_user_tenant_id());

CREATE POLICY service_settings_update ON service_settings FOR UPDATE 
  USING (tenant_id::text = public.get_user_tenant_id());

CREATE POLICY service_settings_delete ON service_settings FOR DELETE 
  USING (tenant_id::text = public.get_user_tenant_id());
