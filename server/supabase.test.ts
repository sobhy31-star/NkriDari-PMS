import { describe, expect, it } from "vitest";
import { createClient } from '@supabase/supabase-js'

describe("Supabase Connection", () => {
  it("should connect to Supabase with provided credentials", async () => {
    const supabaseUrl = process.env.VITE_SUPABASE_URL
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

    expect(supabaseUrl).toBeDefined()
    expect(supabaseAnonKey).toBeDefined()

    const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

    // Test simple query to verify connection
    // On teste juste que la connexion fonctionne sans erreur d'auth
    const { error } = await supabase
      .from('properties')
      .select('id')
      .limit(1)

    // Si l'erreur est null ou si c'est une erreur de table (pas d'auth), c'est OK
    if (error) {
      // Si l'erreur est liée à l'auth, le test échoue
      expect(error.code).not.toBe('PGRST301') // Auth error
      expect(error.message).not.toContain('JWT')
      expect(error.message).not.toContain('authentication')
    }
  });
});
