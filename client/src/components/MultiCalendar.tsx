import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

type Platform = "airbnb" | "booking" | "vrbo" | "direct";

interface Property {
  id: string;
  name: string;
}

interface Reservation {
  id: string;
  propertyId: string;
  guestName: string;
  platform: Platform;
  startDate: string; // ISO
  endDate: string; // ISO
  pricePerNight: number;
}

// Données mock
const mockProperties: Property[] = [
  { id: "1", name: "Villa Marrakech" },
  { id: "2", name: "Riad Fès" },
  { id: "3", name: "Appartement Casablanca" },
];

const mockReservations: Reservation[] = [
  {
    id: "1",
    propertyId: "1",
    guestName: "Jean Dupont",
    platform: "airbnb",
    startDate: "2025-11-25",
    endDate: "2025-11-28",
    pricePerNight: 120,
  },
  {
    id: "2",
    propertyId: "2",
    guestName: "Marie Martin",
    platform: "booking",
    startDate: "2025-11-26",
    endDate: "2025-11-30",
    pricePerNight: 95,
  },
  {
    id: "3",
    propertyId: "1",
    guestName: "Ahmed El Amrani",
    platform: "direct",
    startDate: "2025-11-29",
    endDate: "2025-12-02",
    pricePerNight: 130,
  },
];

const platformColors: Record<Platform, string> = {
  airbnb: "bg-red-500",
  booking: "bg-blue-600",
  vrbo: "bg-purple-600",
  direct: "bg-green-600",
};

const platformLabels: Record<Platform, string> = {
  airbnb: "A",
  booking: "B",
  vrbo: "V",
  direct: "D",
};

export function MultiCalendar() {
  const { currency, locale } = useAppSettings();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("all"); // Filtre par propriété

  // Locale JS pour l'affichage des dates
  const dateLocale =
    locale === "ar" ? "ar-MA" : locale === "en" ? "en-US" : "fr-FR";

  // Générer les jours du mois
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Libellé du mois + année (traduit selon la langue)
  const monthLabel = currentDate.toLocaleString(dateLocale, {
    month: "long",
    year: "numeric",
  });

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Vérifier si une date est dans une réservation
  const getReservationForDay = (propertyId: string, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return mockReservations.find(
      (res) =>
        res.propertyId === propertyId &&
        dateStr >= res.startDate &&
        dateStr <= res.endDate
    );
  };

  // Vérifier si c'est le premier jour d'une réservation
  const isFirstDay = (reservation: Reservation, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return dateStr === reservation.startDate;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("reservation_calendar", locale)}</CardTitle>
          <div className="flex items-center gap-3">
            {/* Filtre par propriété */}
            <Select value={selectedPropertyId} onValueChange={setSelectedPropertyId}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all_properties", locale)}</SelectItem>
                {mockProperties.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[140px] text-center font-semibold">
                {monthLabel}
              </span>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* En-tête avec les jours */}
            <div className="grid grid-cols-[200px_repeat(31,minmax(40px,1fr))] gap-px bg-[var(--nk-border)]">
              <div className="bg-[var(--nk-sand)] p-2 font-semibold">
                {t("property", locale)}
              </div>
              {days.map((day) => (
                <div
                  key={day}
                  className="bg-[var(--nk-sand)] p-2 text-center text-xs font-semibold"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Lignes des propriétés - filtrées */}
            {mockProperties
              .filter(
                (property) =>
                  selectedPropertyId === "all" || property.id === selectedPropertyId
              )
              .map((property) => (
                <div
                  key={property.id}
                  className="grid grid-cols-[200px_repeat(31,minmax(40px,1fr))] gap-px bg-[var(--nk-border)]"
                >
                  {/* Nom de la propriété */}
                  <div className="bg-white p-3 font-medium text-sm">
                    {property.name}
                  </div>

                  {/* Jours */}
                  {days.map((day) => {
                    const reservation = getReservationForDay(property.id, day);

                    if (reservation) {
                      const isFirst = isFirstDay(reservation, day);
                      return (
                        <div
                          key={day}
                          className={cn(
                            "relative bg-white p-1",
                            platformColors[reservation.platform],
                            "text-white text-xs flex items-center justify-center"
                          )}
                        >
                          {isFirst && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                              <span className="font-bold">
                                {platformLabels[reservation.platform]}
                              </span>
                              <span className="text-[10px] truncate w-full text-center">
                                {reservation.guestName.split(" ")[0]}
                              </span>
                              <span className="text-[10px]">
                                {reservation.pricePerNight} {currency}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Jour libre avec prix mock
                    const mockPrice = 80 + Math.floor(Math.random() * 40);
                    return (
                      <div
                        key={day}
                        className="bg-white p-1 text-center text-xs text-gray-400 flex items-center justify-center hover:bg-[var(--nk-sand)] cursor-pointer"
                      >
                        {mockPrice}
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        </div>

        {/* Légende */}
        <div className="mt-4 flex items-center gap-4 text-xs">
          <span className="font-semibold">Plateformes :</span>
          {Object.entries(platformLabels).map(([platform, label]) => (
            <div key={platform} className="flex items-center gap-2">
              <div
                className={cn(
                  "h-4 w-4 rounded",
                  platformColors[platform as Platform]
                )}
              />
              <span className="capitalize">{platform}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
