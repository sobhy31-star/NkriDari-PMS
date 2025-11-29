/**
 * Données mock pour les réservations (mode Preview)
 * 
 * Ce fichier contient un jeu de données de test cohérent pour une année complète
 * de réservations sur 4 propriétés et 4 plateformes.
 */

export interface MockReservation {
  id: string;
  property_id: string;
  property_name: string;
  start_date: string; // Format: YYYY-MM-DD
  end_date: string;
  nights: number;
  status: "confirmed" | "pending" | "cancelled";
  channel: "Airbnb" | "Booking.com" | "Direct" | "Vrbo";
  total_amount: number; // Montant total TTC
  cleaning_fee: number;
  city_tax: number;
  platform_commission: number;
  concierge_commission: number;
  currency: string;
}

// Génère des réservations mock pour une année complète
function generateMockReservations(): MockReservation[] {
  const properties = [
    { id: "prop-1", name: "Villa Marrakech" },
    { id: "prop-2", name: "Riad Fès" },
    { id: "prop-3", name: "Appartement Casablanca" },
    { id: "prop-4", name: "Villa Essaouira" },
  ];

  const channels: Array<"Airbnb" | "Booking.com" | "Direct" | "Vrbo"> = [
    "Airbnb",
    "Booking.com",
    "Direct",
    "Vrbo",
  ];

  const reservations: MockReservation[] = [];
  let idCounter = 1;

  // Générer des réservations pour chaque mois de 2025
  for (let month = 0; month < 12; month++) {
    // Nombre de réservations par mois (varie selon la saison)
    const reservationsPerMonth = month >= 5 && month <= 8 ? 12 : 8; // Plus en été

    for (let i = 0; i < reservationsPerMonth; i++) {
      const property = properties[Math.floor(Math.random() * properties.length)];
      const channel = channels[Math.floor(Math.random() * channels.length)];
      
      // Date de début aléatoire dans le mois
      const startDay = Math.floor(Math.random() * 28) + 1;
      const startDate = new Date(2025, month, startDay);
      
      // Durée de séjour (2 à 7 nuits)
      const nights = Math.floor(Math.random() * 6) + 2;
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + nights);

      // Calcul des montants
      const pricePerNight = 80 + Math.floor(Math.random() * 120); // 80-200€ par nuit
      const totalAmount = pricePerNight * nights;
      const cleaningFee = 40 + Math.floor(Math.random() * 40); // 40-80€
      const cityTax = nights * 2.5; // 2.5€ par nuit
      
      // Commissions selon la plateforme
      let platformCommission = 0;
      if (channel === "Airbnb") {
        platformCommission = totalAmount * 0.15; // 15%
      } else if (channel === "Booking.com") {
        platformCommission = totalAmount * 0.18; // 18%
      } else if (channel === "Vrbo") {
        platformCommission = totalAmount * 0.12; // 12%
      }
      // Direct = 0%

      const conciergeCommission = totalAmount * 0.20; // 20%

      reservations.push({
        id: `res-${idCounter++}`,
        property_id: property.id,
        property_name: property.name,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
        nights,
        status: "confirmed",
        channel,
        total_amount: totalAmount + cleaningFee,
        cleaning_fee: cleaningFee,
        city_tax: cityTax,
        platform_commission: platformCommission,
        concierge_commission: conciergeCommission,
        currency: "EUR",
      });
    }
  }

  return reservations.sort((a, b) => a.start_date.localeCompare(b.start_date));
}

export const mockReservations = generateMockReservations();

// Fonction utilitaire pour filtrer les réservations par mois
export function getReservationsByMonth(
  reservations: MockReservation[],
  year: number,
  month: number // 0-11
): MockReservation[] {
  return reservations.filter((res) => {
    const startDate = new Date(res.start_date);
    return startDate.getFullYear() === year && startDate.getMonth() === month;
  });
}

// Fonction utilitaire pour obtenir le mois courant
export function getCurrentMonth(): { year: number; month: number } {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth(),
  };
}

// Fonction utilitaire pour obtenir le nom du mois en français
export function getMonthName(month: number): string {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  return months[month];
}
