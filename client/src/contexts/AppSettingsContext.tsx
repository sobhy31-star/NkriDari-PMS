import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/lib/supabase";

export type Currency = "EUR" | "MAD" | "USD";
export type Locale = "fr" | "en" | "ar";

interface AppSettingsContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  savePreferences: () => Promise<void>;
}

const AppSettingsContext = createContext<AppSettingsContextValue | undefined>(undefined);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const { user } = useSupabaseAuth();
  const [currency, setCurrencyState] = useState<Currency>("EUR");
  const [locale, setLocaleState] = useState<Locale>("fr");

  // Charger les préférences depuis user_metadata au montage
  useEffect(() => {
    if (user?.user_metadata) {
      const defaultCurrency = user.user_metadata.default_currency as Currency;
      const defaultLocale = user.user_metadata.default_locale as Locale;
      
      if (defaultCurrency) setCurrencyState(defaultCurrency);
      if (defaultLocale) setLocaleState(defaultLocale);
    }
  }, [user]);

  // Fonction pour sauvegarder les préférences dans Supabase
  const savePreferences = async () => {
    if (!user) return;

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          default_currency: currency,
          default_locale: locale,
        },
      });

      if (error) {
        console.error("Erreur lors de la sauvegarde des préférences:", error);
        throw error;
      }
    } catch (err) {
      console.error("Erreur:", err);
      throw err;
    }
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
  };

  const setLocale = (l: Locale) => {
    setLocaleState(l);
  };

  return (
    <AppSettingsContext.Provider
      value={{
        currency,
        setCurrency,
        locale,
        setLocale,
        savePreferences,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error("useAppSettings must be used within an AppSettingsProvider");
  }
  return context;
}
