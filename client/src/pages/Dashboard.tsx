import * as React from "react";

import DeltaPill from "@/components/DeltaPill";
import DashboardLayoutNew from "@/components/DashboardLayoutNew";
import { useAppSettings } from "@/contexts/AppSettingsContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/i18n/useTranslation";
import { MultiCalendar } from "@/components/MultiCalendar";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

// -----------------------------
// Données des graphiques
// -----------------------------
// On met des clés de mois (jan, feb, ...) pour les traductions
const occupancyData = [
  { month: "jan", value: 50 },
  { month: "feb", value: 58 },
  { month: "mar", value: 62 },
  { month: "apr", value: 68 },
  { month: "may", value: 72 },
  { month: "jun", value: 78 },
  { month: "jul", value: 82 },
  { month: "aug", value: 80 },
  { month: "sep", value: 65 },
  { month: "oct", value: 60 },
  { month: "nov", value: 55 },
  { month: "dec", value: 58 },
];

const revenueData = [
  { day: 1, value: 210 },
  { day: 2, value: 190 },
  { day: 3, value: 220 },
  { day: 4, value: 205 },
  { day: 5, value: 230 },
  { day: 6, value: 225 },
  { day: 7, value: 240 },
  { day: 8, value: 215 },
  { day: 9, value: 235 },
  { day: 10, value: 245 },
  { day: 11, value: 230 },
  { day: 12, value: 250 },
  { day: 13, value: 235 },
  { day: 14, value: 260 },
  { day: 15, value: 245 },
  { day: 16, value: 255 },
  { day: 17, value: 240 },
  { day: 18, value: 250 },
  { day: 19, value: 265 },
  { day: 20, value: 255 },
  { day: 21, value: 260 },
  { day: 22, value: 248 },
  { day: 23, value: 270 },
  { day: 24, value: 260 },
  { day: 25, value: 275 },
  { day: 26, value: 268 },
  { day: 27, value: 280 },
  { day: 28, value: 272 },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const { currency } = useAppSettings();

  const formatRevenue = (amount: number) => {
    switch (currency) {
      case "MAD":
        return `${amount.toLocaleString("fr-FR")} DH`;
      case "USD":
        return `${amount.toLocaleString("en-US")} $`;
      case "EUR":
      default:
        return `${amount.toLocaleString("fr-FR")} EUR`;
    }
  };

  return (
    <DashboardLayoutNew title={t("dashboard", "title")}>
      {/* Cartes KPI */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Réservations (mois) */}
        <Card className="relative border-[var(--nk-border)] shadow-sm">
          <DeltaPill value={8.0} />
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wide text-[var(--nk-ink-muted)]">
              {t("dashboard", "reservationsMonth")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-semibold text-[var(--nk-ink)]">
                12
              </div>
              <p className="mt-1 text-xs text-[var(--nk-ink-muted)]">
                {t("dashboard", "activeReservations")}
              </p>
            </div>
            <span className="rounded-full bg-[var(--nk-sand)] px-3 py-1 text-xs font-medium text-[var(--nk-ink-muted)]">
              {t("dashboard", "month")}
            </span>
          </CardContent>
        </Card>

        {/* Taux d’occupation */}
        <Card className="relative border-[var(--nk-border)] shadow-sm">
          <DeltaPill value={4.2} />
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wide text-[var(--nk-ink-muted)]">
              {t("dashboard", "occupancyRate")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-semibold text-[var(--nk-ink)]">
                68%
              </div>
              <p className="mt-1 text-xs text-[var(--nk-ink-muted)]">
                {t("dashboard", "monthlyAverage")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Revenus (mois) – formaté par la devise */}
        <Card className="relative border-[var(--nk-border)] shadow-sm">
          <DeltaPill value={5.2} />
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wide text-[var(--nk-ink-muted)]">
              {t("dashboard", "revenueMonth")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-semibold text-[var(--nk-ink)]">
                {formatRevenue(6500)}
              </div>
              <p className="mt-1 text-xs text-[var(--nk-ink-muted)]">
                {t("dashboard", "totalRevenue")}
              </p>
            </div>
            <span className="rounded-full bg-[var(--nk-sand)] px-3 py-1 text-xs font-medium text-[var(--nk-ink-muted)]">
              {t("dashboard", "month")}
            </span>
          </CardContent>
        </Card>

        {/* Tâches en attente */}
        <Card className="relative border-[var(--nk-border)] shadow-sm">
          <DeltaPill value={-1.0} />
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wide text-[var(--nk-ink-muted)]">
              {t("dashboard", "pendingTasks")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-semibold text-[var(--nk-ink)]">
                5
              </div>
              <p className="mt-1 text-xs text-[var(--nk-ink-muted)]">
                {t("dashboard", "toProcess")}
              </p>
            </div>
            <Button
              variant="secondary"
              className="h-8 px-3 py-1 text-xs"
              onClick={() => {
                window.location.href = "/tasks";
              }}
            >
              {t("dashboard", "viewTasks")}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Graphique d’occupation */}
        <Card className="border-[var(--nk-border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              {t("dashboard", "occupancyChart")}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5ded2"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: string) =>
                    t("dashboard", value as any)
                  }
                />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Graphique de revenus */}
        <Card className="border-[var(--nk-border)] shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              {t("dashboard", "revenueChart")}
            </CardTitle>
            <Select defaultValue="month">
              <SelectTrigger className="h-8 w-[110px] rounded-full border-[var(--nk-border)] bg-white text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">
                  {t("dashboard", "month")}
                </SelectItem>
                <SelectItem value="quarter">
                  {t("dashboard", "quarter")}
                </SelectItem>
                <SelectItem value="year">
                  {t("dashboard", "year")}
                </SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5ded2"
                />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(value: any) => [
                    value,
                    t("reservations", "price"),
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#D9B43A"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Calendrier multi-plateformes */}
      <div className="mt-2">
        <MultiCalendar />
      </div>
    </DashboardLayoutNew>
  );
}
