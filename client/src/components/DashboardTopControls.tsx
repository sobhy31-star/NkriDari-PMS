import { useAppSettings } from "@/contexts/AppSettingsContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { t } from "@/lib/i18n";

/**
 * Composant de sélection de devise et langue
 * Utilise des selects (dropdowns) au lieu de boutons pour un meilleur UX
 * Relié au contexte global AppSettings (currency, locale)
 */
export function DashboardTopControls() {
  const { currency, setCurrency, locale, setLocale } = useAppSettings();

  return (
    <div className="flex items-center gap-6">
      {/* Sélecteur de devise */}
      <div className="flex items-center gap-3">
        <Label htmlFor="currency-select" className="text-sm font-medium text-[var(--nk-ink)]">
          {t("currency", locale)} :
        </Label>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger id="currency-select" className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EUR">EUR (€)</SelectItem>
            <SelectItem value="MAD">MAD (DH)</SelectItem>
            <SelectItem value="USD">USD ($)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sélecteur de langue */}
      <div className="flex items-center gap-3">
        <Label htmlFor="language-select" className="text-sm font-medium text-[var(--nk-ink)]">
          {t("language", locale)} :
        </Label>
        <Select value={locale} onValueChange={setLocale}>
          <SelectTrigger id="language-select" className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ar">العربية</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
