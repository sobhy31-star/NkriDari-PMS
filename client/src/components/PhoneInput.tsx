import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES } from "@/lib/countries";

interface PhoneInputProps {
  value?: string; // Format: "+212 612345678" ou juste "612345678"
  onChange?: (value: string) => void;
  defaultCountryCode?: string; // Code pays par défaut (ex: "MA")
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Composant réutilisable pour saisir un numéro de téléphone avec indicatif pays
 * Utilise le format: indicatif + numéro (ex: "+212 612345678")
 */
export function PhoneInput({
  value = "",
  onChange,
  defaultCountryCode = "MA",
  placeholder = "612345678",
  disabled = false,
}: PhoneInputProps) {
  // Extraire l'indicatif et le numéro depuis la valeur
  const parsePhone = (phone: string) => {
    if (!phone) return { dialCode: "", number: "" };
    
    // Si le numéro commence par +, extraire l'indicatif
    if (phone.startsWith("+")) {
      const parts = phone.split(" ");
      return {
        dialCode: parts[0] || "",
        number: parts.slice(1).join(" "),
      };
    }
    
    // Sinon, utiliser l'indicatif par défaut
    const defaultCountry = COUNTRIES.find((c) => c.code === defaultCountryCode);
    return {
      dialCode: defaultCountry?.dialCode || "+212",
      number: phone,
    };
  };

  const { dialCode, number } = parsePhone(value);

  const handleDialCodeChange = (newDialCode: string) => {
    const fullNumber = `${newDialCode} ${number}`.trim();
    onChange?.(fullNumber);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    const fullNumber = dialCode ? `${dialCode} ${newNumber}`.trim() : newNumber;
    onChange?.(fullNumber);
  };

  return (
    <div className="flex gap-2">
      {/* Select pour l'indicatif */}
      <Select value={dialCode} onValueChange={handleDialCodeChange} disabled={disabled}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="+212" />
        </SelectTrigger>
        <SelectContent>
          {COUNTRIES.map((country) => (
            <SelectItem key={country.code} value={country.dialCode}>
              {country.dialCode} {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Input pour le numéro */}
      <Input
        type="tel"
        value={number}
        onChange={handleNumberChange}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1"
      />
    </div>
  );
}
