-- Migration: Créer la table ota_connections pour stocker les connexions aux plateformes OTA via SU-API
-- Date: 28 novembre 2025
-- À exécuter dans Supabase SQL Editor

CREATE TABLE IF NOT EXISTS ota_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  platform TEXT NOT NULL, -- 'airbnb', 'booking', 'vrbo', etc.
  connection_type TEXT NOT NULL, -- 'su_api' ou 'direct'
  su_api_account_id TEXT,
  su_api_property_id TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'connected', 'error'
  error_message TEXT,
  config JSONB, -- Configuration supplémentaire (credentials, etc.)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, platform, su_api_property_id)
);

-- RLS policies
ALTER TABLE ota_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY ota_connections_select ON ota_connections FOR SELECT 
  USING (tenant_id::text = public.get_user_tenant_id());

CREATE POLICY ota_connections_insert ON ota_connections FOR INSERT 
  WITH CHECK (tenant_id::text = public.get_user_tenant_id());

CREATE POLICY ota_connections_update ON ota_connections FOR UPDATE 
  USING (tenant_id::text = public.get_user_tenant_id());

CREATE POLICY ota_connections_delete ON ota_connections FOR DELETE 
  USING (tenant_id::text = public.get_user_tenant_id());
