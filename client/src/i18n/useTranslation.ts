import { useAppSettings } from '@/contexts/AppSettingsContext';
import { translations, Locale, TranslationSection, TranslationKey } from './translations';

/**
 * Hook personnalisé pour gérer les traductions
 * Lit la langue depuis le contexte global AppSettingsContext
 * 
 * Usage:
 * ```tsx
 * const { t, locale } = useTranslation();
 * 
 * <h1>{t('pages', 'dashboard')}</h1>
 * <button>{t('common', 'save')}</button>
 * ```
 */
export function useTranslation() {
  const { locale } = useAppSettings(); // 'fr' | 'en' | 'ar'

  /**
   * Fonction de traduction avec typage strict
   * @param section - Section de traduction (sidebar, pages, dashboard, etc.)
   * @param key - Clé de traduction dans la section
   * @returns Le texte traduit dans la langue active
   */
  function t<
    S extends TranslationSection,
    K extends TranslationKey<S>
  >(section: S, key: K): string {
    try {
      const localeData = translations[locale as Locale];
      const sectionData = localeData[section] as any;
      const translation = sectionData?.[key as string];
      
      // Fallback sur le français si la traduction n'existe pas
      if (!translation) {
        const frSectionData = translations.fr[section] as any;
        return frSectionData?.[key as string] || `[${section}.${String(key)}]`;
      }
      
      return translation as string;
    } catch (error) {
      return `[${section}.${String(key)}]`;
    }
  }

  return { t, locale };
}
