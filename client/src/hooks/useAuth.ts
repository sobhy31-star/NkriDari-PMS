import { useSupabaseAuth } from "./useSupabaseAuth";
import { useLocation } from "wouter";

/**
 * Hook d'authentification unifié qui utilise Supabase Auth
 * Compatible avec l'ancienne interface useAuth de Manus OAuth
 */
export function useAuth() {
  const { user, session, loading, isAuthenticated, signIn, signUp, signOut } = useSupabaseAuth();
  const [, setLocation] = useLocation();

  // Fonction de déconnexion qui redirige vers /login
  const logout = async () => {
    try {
      await signOut();
      setLocation("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return {
    user: user ? {
      id: user.id,
      email: user.email || "",
      name: user.user_metadata?.full_name || user.email || "",
      openId: user.id,
    } : null,
    session,
    loading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    logout,
  };
}
