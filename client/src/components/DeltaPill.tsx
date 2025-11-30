import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { useAppSettings } from "@/contexts/AppSettingsContext";

interface DeltaPillProps {
  value: number; // ex: 4.2
}

export default function DeltaPill({ value }: DeltaPillProps) {
  const { locale } = useAppSettings();
  const { t } = useTranslation();

  const positive = value >= 0;

  return (
    <div
      className={`absolute right-3 top-3 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold
      ${positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
    >
      {positive ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}

      {/* Valeur + texte traduit */}
      <span>
        {positive ? "+" : ""}
        {value}% {t("dashboard", "vsLastMonth")}
      </span>
    </div>
  );
}
