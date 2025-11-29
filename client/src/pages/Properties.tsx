import { DashboardLayoutCustom } from "@/components/DashboardLayoutCustom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Link } from "wouter";
import { mockPropertiesPerformance, isPreviewMode } from "@/lib/mockData";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "@/i18n/useTranslation";

export default function Properties() {
  const { currency } = useAppSettings();
  const usePreviewData = isPreviewMode();
  const { t } = useTranslation();

  // TODO: Implémenter la liste avec Supabase

  return (
    <DashboardLayoutCustom title={t("pages", "properties")}>
      <div className="space-y-6">
        {/* Section Liste des propriétés */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {t("properties", "list")}
            </h3>
            <Link href="/properties/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t("properties", "newProperty")}
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("properties", "title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("properties", "noProperties")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Section Top 5 des propriétés (prévisualisation seulement) */}
        {usePreviewData && (
          <Card>
            <CardHeader>
              {/* On réutilise des traductions existantes */}
              <CardTitle>{t("dashboard", "allProperties")}</CardTitle>
              <CardDescription>
                {/* Texte fixe pour l’instant (pas encore dans translations) */}
                Classé par taux d&apos;occupation (mois courant)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("properties", "propertyName")}</TableHead>
                    <TableHead>{t("properties", "city")}</TableHead>
                    <TableHead className="text-right">
                      {t("dashboard", "occupancyRate")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("dashboard", "totalRevenue")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPropertiesPerformance.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">
                        {property.name}
                      </TableCell>
                      <TableCell>{property.city}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            property.occupancyRate >= 85
                              ? "text-green-600 font-semibold"
                              : property.occupancyRate >= 70
                              ? "text-orange-600 font-semibold"
                              : "text-muted-foreground"
                          }
                        >
                          {property.occupancyRate}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {property.revenue.toLocaleString()} {currency}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayoutCustom>
  );
}
