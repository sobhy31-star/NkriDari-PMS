import {
  Home,
  Building2,
  Calendar,
  CheckSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/useTranslation";

interface NavItem {
  titleKey: "dashboard" | "properties" | "reservations" | "tasks" | "settings";
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { titleKey: "dashboard", href: "/", icon: Home },
  { titleKey: "properties", href: "/properties", icon: Building2 },
  { titleKey: "reservations", href: "/reservations", icon: Calendar },
  { titleKey: "tasks", href: "/tasks", icon: CheckSquare },
  { titleKey: "settings", href: "/settings", icon: Settings },
];

export function SidebarNew() {
  const [location] = useLocation();
  const { signOut } = useSupabaseAuth();
  const { isCollapsed } = useSidebar(); // on garde juste l’état
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Déconnexion réussie");
      window.location.href = "/login";
    } catch (error) {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col bg-[#1E3D3D] text-white",
        "border-r border-[#0F2A2A]",
        "px-4 py-6",
        isCollapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      {/* LOGO + marque */}
      <div className="px-2 mb-8">
        <div className="flex items-center gap-3">
          {/* Logo carré */}
          <div className="h-10 w-10 rounded-2xl bg-white/95 flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src="/logo-nkridari.png" // ⚠️ mets ton fichier logo dans /client/public avec ce nom
              alt="Logo NkriDari"
              className="h-8 w-8 object-contain"
            />
          </div>

          {/* Texte (caché en mode réduit) */}
          {!isCollapsed && (
            <div className="leading-tight">
              <p className="text-lg font-semibold tracking-tight">
                NkriDari
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                PMS
              </p>
            </div>
          )}
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 flex flex-col gap-2 mt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3",
                  isCollapsed ? "justify-center" : "justify-start",
                  // 👉 texte plus grand + plus gras
                  "text-[15px] font-bold tracking-[0.18em] uppercase",
                  "text-white/80 hover:text-[#D9B43A] hover:bg-black/10",
                  isActive &&
                    "text-[#D9B43A] bg-black/15 border border-[#D9B43A]/80 shadow-none"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && (
                  <span className="leading-none">
                    {t("sidebar", item.titleKey)}
                  </span>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      <Separator className="my-4 bg-white/15" />

      {/* Déconnexion seulement (plus de bouton réduire ici) */}
      <div className="mt-auto flex flex-col gap-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3",
            isCollapsed ? "justify-center" : "justify-start",
            "text-[13px] font-semibold tracking-[0.16em] uppercase",
            "text-white/65 hover:text-red-400 hover:bg-black/10"
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>Déconnexion</span>}
        </Button>
      </div>
    </aside>
  );
}
