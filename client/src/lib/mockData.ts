/**
 * Données mock pour le mode preview Manus
 * Ces données seront remplacées par des appels Supabase en production
 */

export type Period = "month" | "quarter" | "semester" | "year";

export interface DashboardStats {
  bookings: number;
  revenue: number;
  occupancyRate: number;
}

// Données mock par période
export const mockStatsByPeriod: Record<Period, DashboardStats> = {
  month: {
    bookings: 12,
    revenue: 6500,
    occupancyRate: 68,
  },
  quarter: {
    bookings: 35,
    revenue: 19200,
    occupancyRate: 72,
  },
  semester: {
    bookings: 68,
    revenue: 37800,
    occupancyRate: 70,
  },
  year: {
    bookings: 142,
    revenue: 78500,
    occupancyRate: 75,
  },
};

// Données d'occupation mensuelle (12 mois)
export const mockOccupancyData = [
  { month: "Jan", occupancy: 45 },
  { month: "Fév", occupancy: 55 },
  { month: "Mar", occupancy: 60 },
  { month: "Avr", occupancy: 65 },
  { month: "Mai", occupancy: 70 },
  { month: "Jun", occupancy: 75 },
  { month: "Jul", occupancy: 85 },
  { month: "Aoû", occupancy: 90 },
  { month: "Sep", occupancy: 65 },
  { month: "Oct", occupancy: 60 },
  { month: "Nov", occupancy: 50 },
  { month: "Déc", occupancy: 55 },
];

// Données de revenus mensuels (12 mois)
export const mockRevenueData = [
  { month: "Jan", revenue: 4500 },
  { month: "Fév", revenue: 5500 },
  { month: "Mar", revenue: 6000 },
  { month: "Avr", revenue: 6500 },
  { month: "Mai", revenue: 7000 },
  { month: "Jun", revenue: 7500 },
  { month: "Jul", revenue: 8500 },
  { month: "Aoû", revenue: 9000 },
  { month: "Sep", revenue: 6500 },
  { month: "Oct", revenue: 6000 },
  { month: "Nov", revenue: 5000 },
  { month: "Déc", revenue: 5500 },
];

// Données de revenus par jour (pour le filtre "Mois")
export const mockRevenueDailyData = [
  { day: "1", revenue: 210 },
  { day: "2", revenue: 180 },
  { day: "3", revenue: 230 },
  { day: "4", revenue: 195 },
  { day: "5", revenue: 220 },
  { day: "6", revenue: 240 },
  { day: "7", revenue: 260 },
  { day: "8", revenue: 200 },
  { day: "9", revenue: 190 },
  { day: "10", revenue: 210 },
  { day: "11", revenue: 230 },
  { day: "12", revenue: 250 },
  { day: "13", revenue: 270 },
  { day: "14", revenue: 240 },
  { day: "15", revenue: 220 },
  { day: "16", revenue: 200 },
  { day: "17", revenue: 210 },
  { day: "18", revenue: 230 },
  { day: "19", revenue: 250 },
  { day: "20", revenue: 270 },
  { day: "21", revenue: 260 },
  { day: "22", revenue: 240 },
  { day: "23", revenue: 220 },
  { day: "24", revenue: 200 },
  { day: "25", revenue: 210 },
  { day: "26", revenue: 230 },
  { day: "27", revenue: 250 },
  { day: "28", revenue: 270 },
  { day: "29", revenue: 260 },
  { day: "30", revenue: 240 },
];

export interface MockReservation {
  id: string;
  property: string;
  platform: "Airbnb" | "Booking" | "Vrbo" | "Direct";
  checkIn: string;
  checkOut: string;
  guest: string;
}

// Données de réservations mock
export const mockReservations: MockReservation[] = [
  {
    id: "1",
    property: "Villa Marrakech",
    platform: "Airbnb",
    checkIn: "2025-12-01",
    checkOut: "2025-12-05",
    guest: "Jean Dupont",
  },
  {
    id: "2",
    property: "Riad Fès",
    platform: "Booking",
    checkIn: "2025-12-03",
    checkOut: "2025-12-08",
    guest: "Marie Martin",
  },
  {
    id: "3",
    property: "Appartement Casablanca",
    platform: "Vrbo",
    checkIn: "2025-12-10",
    checkOut: "2025-12-15",
    guest: "Pierre Bernard",
  },
  {
    id: "4",
    property: "Villa Marrakech",
    platform: "Direct",
    checkIn: "2025-12-18",
    checkOut: "2025-12-22",
    guest: "Sophie Laurent",
  },
  {
    id: "5",
    property: "Riad Fès",
    platform: "Airbnb",
    checkIn: "2025-12-20",
    checkOut: "2025-12-27",
    guest: "Thomas Dubois",
  },
];

export const mockProperties = [
  { id: "1", name: "Villa Marrakech", city: "Marrakech" },
  { id: "2", name: "Riad Fès", city: "Fès" },
  { id: "3", name: "Appartement Casablanca", city: "Casablanca" },
];

// Données de tâches mock
export const mockTasks = [
  {
    id: "1",
    type: "cleaning",
    propertyId: "1",
    propertyName: "Villa Marrakech",
    assignedTo: "Fatima El Amrani",
    date: "2025-12-01",
    status: "pending",
  },
  {
    id: "2",
    type: "maintenance",
    propertyId: "2",
    propertyName: "Riad Fès",
    assignedTo: "Ahmed Benali",
    date: "2025-12-02",
    status: "pending",
  },
  {
    id: "3",
    type: "checkin",
    propertyId: "1",
    propertyName: "Villa Marrakech",
    assignedTo: "Mohamed Alaoui",
    date: "2025-12-03",
    status: "pending",
  },
];

// Type pour les activités récentes
export type ActivityType = "checkin" | "checkout" | "cleaning";

export interface Activity {
  type: ActivityType;
  date: string;
  label: string;
}

// Fonction pour générer les activités récentes depuis les réservations et tâches
export function getRecentActivities(): Activity[] {
  const activities: Activity[] = [];

  // Ajouter les check-ins depuis les réservations
  mockReservations.forEach((reservation) => {
    activities.push({
      type: "checkin",
      date: reservation.checkIn,
      label: `Check-in - ${reservation.guest}`,
    });
    activities.push({
      type: "checkout",
      date: reservation.checkOut,
      label: `Check-out - ${reservation.guest}`,
    });
  });

  // Ajouter les tâches de ménage
  mockTasks
    .filter((task) => task.type === "cleaning")
    .forEach((task) => {
      activities.push({
        type: "cleaning",
        date: task.date,
        label: `Ménage - ${task.assignedTo}`,
      });
    });

  // Trier par date et retourner les 3 prochaines
  return activities
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
}

/**
 * Détecte si on est en mode preview Manus
 * (URL contient "manus" ou paramètre preview=true)
 */
export const isPreviewMode = (): boolean => {
  if (typeof window === "undefined") return false;
  const url = window.location.href;
  const params = new URLSearchParams(window.location.search);
  return url.includes("manus") || params.has("preview") || import.meta.env.DEV;
};

/**
 * Fonction à implémenter plus tard pour récupérer les stats depuis Supabase
 * @param period - Période sélectionnée (month, quarter, semester, year)
 * @returns Statistiques du dashboard
 */
export async function getDashboardStats(period: Period): Promise<DashboardStats> {
  // TODO: Implémenter la requête Supabase
  // Pour l'instant, retourner les données mock
  return mockStatsByPeriod[period];
}

// Données mock pour le Top 5 des propriétés
export interface PropertyPerformance {
  id: string;
  name: string;
  city: string;
  occupancyRate: number;
  revenue: number;
}

export const mockPropertiesPerformance: PropertyPerformance[] = [
  {
    id: "1",
    name: "Villa Marrakech",
    city: "Marrakech",
    occupancyRate: 92,
    revenue: 15200,
  },
  {
    id: "2",
    name: "Riad Fès",
    city: "Fès",
    occupancyRate: 88,
    revenue: 13800,
  },
  {
    id: "3",
    name: "Appartement Casablanca",
    city: "Casablanca",
    occupancyRate: 85,
    revenue: 12500,
  },
  {
    id: "4",
    name: "Villa Essaouira",
    city: "Essaouira",
    occupancyRate: 80,
    revenue: 11200,
  },
  {
    id: "5",
    name: "Riad Tanger",
    city: "Tanger",
    occupancyRate: 75,
    revenue: 9800,
  },
];
