import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES } from "@/lib/countries";

interface CountrySelectProps {
  value?: string; // Code pays ISO (ex: "MA") ou nom du pays
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  mode?: "code" | "name"; // Retourner le code ISO ou le nom du pays
}

/**
 * Composant réutilisable pour sélectionner un pays
 * Peut retourner soit le code ISO (ex: "MA") soit le nom (ex: "Maroc")
 */
export function CountrySelect({
  value = "",
  onChange,
  placeholder = "Sélectionner un pays",
  disabled = false,
  mode = "code",
}: CountrySelectProps) {
  const handleChange = (selectedValue: string) => {
    if (mode === "code") {
      // Retourner le code ISO
      onChange?.(selectedValue);
    } else {
      // Retourner le nom du pays
      const country = COUNTRIES.find((c) => c.code === selectedValue);
      onChange?.(country?.name || selectedValue);
    }
  };

  // Si la valeur est un nom de pays, trouver le code correspondant
  const getCodeFromValue = (val: string): string => {
    if (!val) return "";
    
    // Si c'est déjà un code ISO (2 lettres majuscules)
    if (/^[A-Z]{2}$/.test(val)) return val;
    
    // Sinon, chercher par nom
    const country = COUNTRIES.find(
      (c) => c.name.toLowerCase() === val.toLowerCase()
    );
    return country?.code || "";
  };

  const selectedCode = mode === "code" ? value : getCodeFromValue(value);

  return (
    <Select value={selectedCode} onValueChange={handleChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {COUNTRIES.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
