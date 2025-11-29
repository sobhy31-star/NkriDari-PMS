import * as React from "react";

import DeltaPill from "@/components/DeltaPill";
import DashboardLayoutNew from "@/components/DashboardLayoutNew";



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

const occupancyData = [
  { month: "Jan", value: 50 },
  { month: "Fév", value: 58 },
  { month: "Mar", value: 62 },
  { month: "Avr", value: 68 },
  { month: "Mai", value: 72 },
  { month: "Juin", value: 78 },
  { month: "Juil", value: 82 },
  { month: "Aoû", value: 80 },
  { month: "Sep", value: 65 },
  { month: "Oct", value: 60 },
  { month: "Nov", value: 55 },
  { month: "Déc", value: 58 },
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

  return (
    <DashboardLayoutNew title={t("pages", "dashboard")}>
      <div className="space-y-6">
        {/* Filtres en haut */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[var(--nk-ink-muted)] font-medium">
                Devise :
              </span>
              <Select defaultValue="eur">
                <SelectTrigger className="h-9 w-[120px] rounded-full border-[var(--nk-border)] bg-white text-xs font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="mad">MAD (DH)</SelectItem>
                  <SelectItem value="usd">USD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[var(--nk-ink-muted)] font-medium">
                Langue :
              </span>
              <Select defaultValue="fr">
                <SelectTrigger className="h-9 w-[130px] rounded-full border-[var(--nk-border)] bg-white text-xs font-medium">
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

          <Button variant="default">+ Ajouter une propriété</Button>
        </div>

        {/* Cartes KPI */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
                  6 500 EUR
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
              <Button variant="secondary" className="h-8 px-3 py-1 text-xs">
                Voir les tâches
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques */}
        <div className="grid gap-4 lg:grid-cols-2">
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
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

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
                  <Tooltip />
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

        <div className="mt-2">
          <MultiCalendar />
        </div>
      </div>
    </DashboardLayoutNew>
  );
}
