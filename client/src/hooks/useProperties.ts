import { useState, useEffect } from "react";
import { useSupabase } from "./useSupabase";
import type { Property } from "@shared/supabase.types";
import { toast } from "sonner";

export function useProperties() {
  const { supabase, tenantId, loading: tenantLoading } = useSupabase();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tenantLoading) return;
    if (!tenantId) {
      setLoading(false);
      return;
    }

    fetchProperties();
  }, [tenantId, tenantLoading]);

  async function fetchProperties() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('tenant_id', tenantId!)
        .neq('status', 'archived')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      console.error('Error fetching properties:', error);
      toast.error('Erreur lors du chargement des propriétés');
    } finally {
      setLoading(false);
    }
  }

  async function createProperty(property: Omit<Property, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert({
          ...property,
          tenant_id: tenantId!,
        } as any)
        .select()
        .single();

      if (error) throw error;
      toast.success('Propriété créée avec succès');
      await fetchProperties();
      return data;
    } catch (error: any) {
      console.error('Error creating property:', error);
      toast.error('Erreur lors de la création de la propriété');
      throw error;
    }
  }

  async function updateProperty(id: string, property: Partial<Property>) {
    try {
      const { error } = await supabase
        .from('properties')
        .update({
          ...property,
          updated_at: new Date().toISOString(),
        } as any)
        .eq('id', id)
        .eq('tenant_id', tenantId!);

      if (error) throw error;
      toast.success('Propriété modifiée avec succès');
      await fetchProperties();
    } catch (error: any) {
      console.error('Error updating property:', error);
      toast.error('Erreur lors de la modification de la propriété');
      throw error;
    }
  }

  async function deleteProperty(id: string) {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status: 'archived' } as any)
        .eq('id', id)
        .eq('tenant_id', tenantId!);

      if (error) throw error;
      toast.success('Propriété archivée avec succès');
      await fetchProperties();
    } catch (error: any) {
      console.error('Error deleting property:', error);
      toast.error('Erreur lors de l\'archivage de la propriété');
      throw error;
    }
  }

  return {
    properties,
    loading: loading || tenantLoading,
    fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty,
  };
}
