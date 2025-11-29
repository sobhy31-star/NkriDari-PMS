import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MockReservation } from "@/lib/mockReservations";
import { getReservationsByMonth } from "@/lib/mockReservations";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { useTranslation } from "@/i18n/useTranslation";

interface YearlyStatsTableProps {
  reservations: MockReservation[];
  year: number;
}

interface MonthStats {
  month: string;
  nightsBooked: number;
  nightsRemaining: number;
  occupancyRate: number;
  platformCommissions: number;
  cityTax: number;
  revenue: number;
  netRevenue: number;
}

export function YearlyStatsTable({ reservations, year }: YearlyStatsTableProps) {
  const { currency } = useAppSettings();
  const { t } = useTranslation();

  // Nombre de propriétés actives (estimation basée sur les réservations)
  const activeProperties = new Set(reservations.map((r) => r.property_id)).size;

  // Clés des mois pour utiliser translations.dashboard
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

  const monthlyStats: MonthStats[] = [];

  // Calcul des statistiques par mois
  for (let month = 0; month < 12; month++) {
    const monthReservations = getReservationsByMonth(reservations, year, month);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const nightsBooked = monthReservations.reduce((sum, r) => sum + r.nights, 0);
    const totalCapacity = activeProperties * daysInMonth;
    const nightsRemaining = totalCapacity - nightsBooked;
    const occupancyRate = totalCapacity > 0 ? (nightsBooked / totalCapacity) * 100 : 0;

    const platformCommissions = monthReservations.reduce(
      (sum, r) => sum + r.platform_commission,
      0
    );
    const cityTax = monthReservations.reduce((sum, r) => sum + r.city_tax, 0);
    const revenue = monthReservations.reduce((sum, r) => sum + r.total_amount, 0);
    const conciergeCommissions = monthReservations.reduce(
      (sum, r) => sum + r.concierge_commission,
      0
    );
    const netRevenue = revenue - platformCommissions - conciergeCommissions - cityTax;

    const monthLabel = t("dashboard", monthKeys[month]);

    monthlyStats.push({
      month: monthLabel,
      nightsBooked,
      nightsRemaining,
      occupancyRate,
      platformCommissions,
      cityTax,
      revenue,
      netRevenue,
    });
  }

  // Calcul des totaux
  const totals = monthlyStats.reduce(
    (acc, stats) => ({
      nightsBooked: acc.nightsBooked + stats.nightsBooked,
      nightsRemaining: acc.nightsRemaining + stats.nightsRemaining,
      platformCommissions: acc.platformCommissions + stats.platformCommissions,
      cityTax: acc.cityTax + stats.cityTax,
      revenue: acc.revenue + stats.revenue,
      netRevenue: acc.netRevenue + stats.netRevenue,
    }),
    {
      nightsBooked: 0,
      nightsRemaining: 0,
      platformCommissions: 0,
      cityTax: 0,
      revenue: 0,
      netRevenue: 0,
    }
  );

  const avgOccupancyRate =
    totals.nightsBooked + totals.nightsRemaining > 0
      ? (totals.nightsBooked / (totals.nightsBooked + totals.nightsRemaining)) * 100
      : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("reservations", "annualTable")}</CardTitle>
        <CardDescription>
          {t("reservations", "annualTableDesc")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("reservations", "period")}</TableHead>
                <TableHead className="text-right">
                  {t("reservations", "nightsBooked")}
                </TableHead>
                <TableHead className="text-right">
                  {t("reservations", "nightsRemaining")}
                </TableHead>
                <TableHead className="text-right">
                  {t("dashboard", "occupancyRate")}
                </TableHead>
                <TableHead className="text-right">
                  {t("reservations", "platformCommissions")}
                </TableHead>
                <TableHead className="text-right">
                  {t("reservations", "touristTax")}
                </TableHead>
                <TableHead className="text-right">
                  {t("reservations", "grossCA")}
                </TableHead>
                <TableHead className="text-right">
                  {t("reservations", "netOwnerRevenue")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyStats.map((stats, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{stats.month}</TableCell>
                  <TableCell className="text-right">{stats.nightsBooked}</TableCell>
                  <TableCell className="text-right">{stats.nightsRemaining}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        stats.occupancyRate >= 70
                          ? "text-green-600 font-semibold"
                          : stats.occupancyRate >= 50
                          ? "text-orange-600 font-semibold"
                          : "text-muted-foreground"
                      }
                    >
                      {stats.occupancyRate.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {stats.platformCommissions.toFixed(0)} {currency}
                  </TableCell>
                  <TableCell className="text-right">
                    {stats.cityTax.toFixed(0)} {currency}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {stats.revenue.toFixed(0)} {currency}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-green-600">
                    {stats.netRevenue.toFixed(0)} {currency}
                  </TableCell>
                </TableRow>
              ))}

              {/* Ligne Total */}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell>{t("reservations", "total")}</TableCell>
                <TableCell className="text-right">
                  {totals.nightsBooked}
                </TableCell>
                <TableCell className="text-right">
                  {totals.nightsRemaining}
                </TableCell>
                <TableCell className="text-right">
                  {avgOccupancyRate.toFixed(1)}%
                </TableCell>
                <TableCell className="text-right">
                  {totals.platformCommissions.toFixed(0)} {currency}
                </TableCell>
                <TableCell className="text-right">
                  {totals.cityTax.toFixed(0)} {currency}
                </TableCell>
                <TableCell className="text-right">
                  {totals.revenue.toFixed(0)} {currency}
                </TableCell>
                <TableCell className="text-right text-green-600">
                  {totals.netRevenue.toFixed(0)} {currency}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
