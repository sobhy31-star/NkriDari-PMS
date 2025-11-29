// client/src/components/SidebarNew.tsx
import * as React from "react";
import {
  Home,
  Building2,
  Calendar,
  CheckSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
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
  const { isCollapsed, toggleSidebar } = useSidebar();
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
      {/* HEADER LOGO + BOUTON COLLAPSE */}
      <div className="mb-8 flex items-center justify-between px-2">
        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold text-white">NkriDari</h1>
            <p className="text-xs text-white/70">PMS</p>
          </div>
        )}

        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/10"
          aria-label={isCollapsed ? "Ouvrir la sidebar" : "Réduire la sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 flex flex-col gap-3 mt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-4",
                  "justify-start",
                  "text-xl font-bold tracking-wide uppercase",
                  "text-white/85 hover:text-[#D9B43A] hover:bg-black/10",
                  isActive &&
                    "text-[#D9B43A] bg-black/15 border border-[#D9B43A] shadow-none",
                  isCollapsed && "justify-center px-0"
                )}
              >
                <Icon className="h-7 w-7 shrink-0" />
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

      <Separator className="my-6 bg-white/20" />

      {/* LOGOUT */}
      <Button
        variant="ghost"
        className={cn(
          "w-full flex items-center gap-4 px-4 py-4",
          "justify-start",
          "text-xl font-bold tracking-wide uppercase",
          "text-white/60 hover:text-red-400 hover:bg-black/10",
          isCollapsed && "justify-center px-0"
        )}
        onClick={handleLogout}
      >
        <LogOut className="h-7 w-7 shrink-0" />
        {!isCollapsed && <span>Déconnexion</span>}
      </Button>
    </aside>
  );
}
