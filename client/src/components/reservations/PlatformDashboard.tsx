import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MockReservation } from "@/lib/mockReservations";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTranslation } from "@/i18n/useTranslation";

interface PlatformDashboardProps {
  reservations: MockReservation[];
}

const PLATFORM_COLORS: Record<string, string> = {
  Airbnb: "#FF5A5F",
  "Booking.com": "#003580",
  Direct: "#D4A574",
  Vrbo: "#0071CE",
};

export function PlatformDashboard({ reservations }: PlatformDashboardProps) {
  const { currency } = useAppSettings();
  const { t } = useTranslation();

  const platformStats = reservations.reduce((acc, res) => {
    if (!acc[res.channel]) {
      acc[res.channel] = { nights: 0, revenue: 0 };
    }
    acc[res.channel].nights += res.nights;
    acc[res.channel].revenue += res.total_amount;
    return acc;
  }, {} as Record<string, { nights: number; revenue: number }>);

  const totalNights = Object.values(platformStats).reduce((sum, s) => sum + s.nights, 0);
  const totalRevenue = Object.values(platformStats).reduce((sum, s) => sum + s.revenue, 0);

  const occupancyData = Object.entries(platformStats).map(([name, stats]) => ({
    name,
    value: stats.nights,
    percentage: totalNights ? (stats.nights / totalNights) * 100 : 0,
  }));

  const revenueData = Object.entries(platformStats).map(([name, stats]) => ({
    name,
    value: stats.revenue,
  }));

  const renderLegend = (data: any[], isRevenue: boolean) => (
    <div className="space-y-2">
      {data.map((entry, index) => (
        <div key={index} className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: PLATFORM_COLORS[entry.name] || "#ccc" }}
            />
            <span>{entry.name}</span>
          </div>
          <div className="font-semibold">
            {isRevenue ? `${entry.value.toFixed(0)} ${currency}` : `${entry.percentage.toFixed(1)}%`}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("reservations", "occupancyByPlatform")}</CardTitle>
          <CardDescription>{t("reservations", "occupancyByPlatformDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {occupancyData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={PLATFORM_COLORS[entry.name] || "#ccc"}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v} nuits`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 min-w-[200px]">{renderLegend(occupancyData, false)}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("reservations", "revenueByPlatform")}</CardTitle>
          <CardDescription>{t("reservations", "revenueByPlatformDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {revenueData.map((entry, i) => (
                    <Cell key={i} fill={PLATFORM_COLORS[entry.name] || "#ccc"} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v.toFixed(0)} ${currency}`} />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex-1 min-w-[200px]">{renderLegend(revenueData, true)}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
