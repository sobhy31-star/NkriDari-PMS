/**
 * Système de traductions basique pour NkriDari PMS
 * Supporte FR, EN, AR (pour l'instant AR en caractères latins)
 */

export type Locale = "fr" | "en" | "ar";

type TranslationKey =
  | "reservations_of_month"
  | "occupation_rate"
  | "revenue_of_month"
  | "pending_tasks"
  | "revenue_chart"
  | "occupation_chart"
  | "recent_activity"
  | "active_reservations"
  | "monthly_average"
  | "total_revenue"
  | "to_process"
  | "to_implement"
  | "no_recent_activity"
  | "reservation_calendar"
  | "filter"
  | "property"
  | "all_properties"
  | "currency"
  | "language";

const translations: Record<Locale, Record<TranslationKey, string>> = {
  fr: {
    reservations_of_month: "Réservations du mois",
    occupation_rate: "Taux d'occupation",
    revenue_of_month: "Revenus du mois",
    pending_tasks: "Tâches en attente",
    revenue_chart: "Graphique de revenus",
    occupation_chart: "Graphique d'occupation",
    recent_activity: "Activité récente",
    active_reservations: "Réservations actives",
    monthly_average: "Moyenne mensuelle",
    total_revenue: "Total des revenus",
    to_process: "À traiter",
    to_implement: "À implémenter",
    no_recent_activity: "Aucune activité récente",
    reservation_calendar: "Calendrier des réservations",
    filter: "Filtrer",
    property: "Propriété",
    all_properties: "Tous les logements",
    currency: "Devise",
    language: "Langue",
  },
  en: {
    reservations_of_month: "Reservations this month",
    occupation_rate: "Occupation rate",
    revenue_of_month: "Revenue this month",
    pending_tasks: "Pending tasks",
    revenue_chart: "Revenue chart",
    occupation_chart: "Occupation chart",
    recent_activity: "Recent activity",
    active_reservations: "Active reservations",
    monthly_average: "Monthly average",
    total_revenue: "Total revenue",
    to_process: "To process",
    to_implement: "To implement",
    no_recent_activity: "No recent activity",
    reservation_calendar: "Reservation calendar",
    filter: "Filter",
    property: "Property",
    all_properties: "All properties",
    currency: "Currency",
    language: "Language",
  },
  ar: {
    // Traductions en arabe réel
    reservations_of_month: "الحجوزات هذا الشهر",
    occupation_rate: "نسبة الإشغال",
    revenue_of_month: "إيرادات هذا الشهر",
    pending_tasks: "المهام المعلقة",
    revenue_chart: "مخطط الإيرادات",
    occupation_chart: "مخطط الإشغال",
    recent_activity: "النشاط الأخير",
    active_reservations: "الحجوزات النشطة",
    monthly_average: "المتوسط الشهري",
    total_revenue: "إجمالي الإيرادات",
    to_process: "للمعالجة",
    to_implement: "للتنفيذ",
    no_recent_activity: "لا يوجد نشاط أخير",
    reservation_calendar: "تقويم الحجوزات",
    filter: "تصفية",
    property: "عقار",
    all_properties: "جميع العقارات",
    currency: "العملة",
    language: "اللغة",
  },
};

/**
 * Fonction de traduction
 * @param key - Clé de traduction
 * @param locale - Langue (fr, en, ar)
 * @returns Texte traduit
 */
export function t(key: TranslationKey, locale: Locale = "fr"): string {
  return translations[locale][key] || translations.fr[key] || key;
}
