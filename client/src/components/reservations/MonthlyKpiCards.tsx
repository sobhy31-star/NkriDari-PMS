import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MockReservation } from "@/lib/mockReservations";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { useTranslation } from "@/i18n/useTranslation";

interface MonthlyKpiCardsProps {
  reservations: MockReservation[];
  year: number;
  month: number;
}

export function MonthlyKpiCards({ reservations, year, month }: MonthlyKpiCardsProps) {
  const { currency } = useAppSettings();

  // ⚠️ On cast en any ici pour ne pas avoir d'erreur TS
  const { t } = useTranslation() as any;

  // Calcul du nombre de jours dans le mois
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Calcul des KPIs
  const activeProperties = new Set(reservations.map((r) => r.property_id)).size;
  const nightsBooked = reservations.reduce((sum, r) => sum + r.nights, 0);

  const totalCapacity = activeProperties * daysInMonth;
  const nightsRemaining = totalCapacity - nightsBooked;

  const occupancyRate = totalCapacity > 0 ? (nightsBooked / totalCapacity) * 100 : 0;

  const confirmedReservations = reservations.filter((r) => r.status === "confirmed");
  const totalRevenue = confirmedReservations.reduce((sum, r) => sum + r.total_amount, 0);

  const avgPricePerReservation =
    confirmedReservations.length > 0 ? totalRevenue / confirmedReservations.length : 0;

  const totalPlatformCommissions = reservations.reduce(
    (sum, r) => sum + r.platform_commission,
    0
  );

  const totalConciergeCommissions = reservations.reduce(
    (sum, r) => sum + r.concierge_commission,
    0
  );

  const totalCityTax = reservations.reduce((sum, r) => sum + r.city_tax, 0);

  const netOwnerRevenue =
    totalRevenue - totalPlatformCommissions - totalConciergeCommissions - totalCityTax;

  const checkInsCheckOuts = confirmedReservations.length;

  const kpis = [
    {
      title: t("reservations", "activeProperties"),
      value: activeProperties.toString(),
      description: t("reservations", "activePropertiesDesc"),
    },
    {
      title: t("reservations", "nightsBooked"),
      value: nightsBooked.toString(),
      description: t("reservations", "nightsBookedDesc"),
    },
    {
      title: t("reservations", "nightsRemaining"),
      value: nightsRemaining.toString(),
      description: t("reservations", "nightsRemainingDesc"),
    },
    {
      title: t("dashboard", "occupancyRate"),
      value: `${occupancyRate.toFixed(1)}%`,
      description: t("reservations", "occupancyDesc"),
    },
    {
      title: t("reservations", "avgPricePerReservation"),
      value: `${avgPricePerReservation.toFixed(0)} ${currency}`,
      description: t("reservations", "avgPricePerReservationDesc"),
    },
    {
      title: t("reservations", "grossRevenue"),
      value: `${totalRevenue.toFixed(0)} ${currency}`,
      description: t("reservations", "grossRevenueDesc"),
    },
    {
      title: t("reservations", "platformCommissions"),
      value: `${totalPlatformCommissions.toFixed(0)} ${currency}`,
      description: t("reservations", "platformCommissionsDesc"),
    },
    {
      title: t("reservations", "conciergeCommission"),
      value: `${totalConciergeCommissions.toFixed(0)} ${currency}`,
      description: t("reservations", "conciergeCommissionDesc"),
    },
    {
      title: t("reservations", "netOwnerRevenue"),
      value: `${netOwnerRevenue.toFixed(0)} ${currency}`,
      description: t("reservations", "netOwnerRevenueDesc"),
    },
    {
      title: t("reservations", "checkinCheckout"),
      value: checkInsCheckOuts.toString(),
      description: t("reservations", "checkinCheckoutDesc"),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
