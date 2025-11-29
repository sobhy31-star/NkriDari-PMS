import { supabase } from "@/lib/supabase";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

/**
 * Hook personnalisé pour gérer les requêtes Supabase avec le tenant_id de l'utilisateur
 * Note: Le tenant_id est lu directement depuis user.user_metadata.tenant_id
 */
export function useSupabase() {
  const { user, loading: authLoading } = useSupabaseAuth();

  // Récupérer le tenant_id depuis les métadonnées utilisateur
  const tenantId = user?.user_metadata?.tenant_id || null;



  return {
    supabase,
    tenantId,
    loading: authLoading,
    userId: user?.id || null,
    user,
  };
}
