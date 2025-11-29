import { useState } from "react";
import DashboardLayoutNew from "@/components/DashboardLayoutNew";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonthlyKpiCards } from "@/components/reservations/MonthlyKpiCards";
import { PlatformDashboard } from "@/components/reservations/PlatformDashboard";
import { YearlyStatsTable } from "@/components/reservations/YearlyStatsTable";
import {
  mockReservations,
  getReservationsByMonth,
  getCurrentMonth,
} from "@/lib/mockReservations";
import { isPreviewMode } from "@/lib/mockData";
import { useTranslation } from "@/i18n/useTranslation";

type Period = "current_month" | "previous_month" | "current_year";

export default function Reservations() {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("current_month");
  const usePreviewData = isPreviewMode();

  // TODO: Remplacer par les vraies données Supabase quand disponible
  const reservations = usePreviewData ? mockReservations : [];

  // Mois localisés via translations.dashboard
  const monthKeys: Array<
    | "january"
    | "february"
    | "march"
    | "april"
    | "may"
    | "june"
    | "july"
    | "august"
    | "september"
    | "october"
    | "november"
    | "december"
  > = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const getMonthLabel = (monthIndex: number) => {
    const key = monthKeys[monthIndex];
    return t("dashboard", key);
  };

  // Calcul de la période sélectionnée
  const { year: currentYear, month: currentMonth } = getCurrentMonth();

  let displayYear = currentYear;
  let displayMonth = currentMonth;
  let periodTitle = "";

  switch (selectedPeriod) {
    case "current_month":
      periodTitle = `${getMonthLabel(currentMonth)} ${currentYear}`;
      break;
    case "previous_month":
      displayMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      displayYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      periodTitle = `${getMonthLabel(displayMonth)} ${displayYear}`;
      break;
    case "current_year":
      periodTitle = `${displayYear}`;
      break;
  }

  // Filtrer les réservations selon la période
  const filteredReservations =
    selectedPeriod === "current_year"
      ? reservations.filter(
          (r) => new Date(r.start_date).getFullYear() === displayYear
        )
      : getReservationsByMonth(reservations, displayYear, displayMonth);

  return (
    <DashboardLayoutNew title={t("reservations", "title")}>
      <div className="space-y-8">
        {/* En-tête avec sélecteur de période */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {t("reservations", "analyticsView")}
            </h2>
            <p className="text-muted-foreground">{periodTitle}</p>
          </div>
          <Select
            value={selectedPeriod}
            onValueChange={(value) => setSelectedPeriod(value as Period)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue
                placeholder={t("reservations", "currentMonth")}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_month">
                {t("reservations", "currentMonth")}
              </SelectItem>
              <SelectItem value="previous_month">
                {/* Pas encore de clé dédiée dans translations.ts, on laisse en FR pour l’instant */}
                Mois précédent
              </SelectItem>
              <SelectItem value="current_year">
                {/* On réutilise "Statistiques annuelles" comme label */}
                {t("reservations", "annualStats")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bloc 1 : KPIs mensuels */}
        {selectedPeriod !== "current_year" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t("reservations", "keyIndicators")}
            </h3>
            <MonthlyKpiCards
              reservations={filteredReservations}
              year={displayYear}
              month={displayMonth}
            />
          </div>
        )}

        {/* Bloc 2 : Tableau de bord des plateformes */}
        {selectedPeriod !== "current_year" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t("reservations", "platformDashboard")}
            </h3>
            <PlatformDashboard reservations={filteredReservations} />
          </div>
        )}

        {/* Bloc 3 : Tableau annuel détaillé */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {t("reservations", "annualStats")}
          </h3>
          <YearlyStatsTable reservations={reservations} year={displayYear} />
        </div>

        {/* Message si pas de données */}
        {!usePreviewData && reservations.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>{t("reservations", "noReservations")}</p>
            <p className="text-sm mt-2">
              {/* Texte d’aide, pas encore dans translations.ts → FR pour l’instant */}
              Les données apparaîtront ici une fois que vous aurez créé des
              réservations.
            </p>
          </div>
        )}
      </div>
    </DashboardLayoutNew>
  );
}
