// client/src/components/DashboardLayoutNew.tsx
import * as React from "react";
import { SidebarNew } from "@/components/SidebarNew";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/contexts/SidebarContext";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardLayoutNewProps {
  title: string;
  children: React.ReactNode;
}

export default function DashboardLayoutNew({
  title,
  children,
}: DashboardLayoutNewProps) {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { currency, setCurrency, locale, setLocale } = useAppSettings();

  return (
    <div className="min-h-screen flex bg-[var(--nk-sand-soft)]">
      {/* Sidebar à gauche */}
      <SidebarNew />

      {/* Contenu principal */}
      <main className="flex-1 px-6 py-6">
        <header className="mb-6 flex items-center justify-between">
          {/* Titre + bouton sidebar */}
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-[#1E3D3D] hover:bg-black/5"
              onClick={toggleSidebar}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="h-5 w-5" />
              ) : (
                <PanelLeftClose className="h-5 w-5" />
              )}
            </Button>

            <h1 className="text-2xl font-semibold text-[var(--nk-ink)]">
              {title}
            </h1>
          </div>

          {/* Filtres Devise + Langue */}
          <div className="flex items-center gap-6">
            {/* Devise */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--nk-ink-soft)]">Devise :</span>
              <Select
                value={currency}
                onValueChange={(value) => setCurrency(value as any)}
              >
                <SelectTrigger className="h-9 w-[140px] rounded-full bg-[#163636] text-white border-transparent px-4 text-sm shadow-sm hover:bg-[#163636]/90">
  <SelectValue />
</SelectTrigger>

                <SelectContent>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="MAD">MAD (DH)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Langue */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--nk-ink-soft)]">Langue :</span>
              <Select
                value={locale}
                onValueChange={(value) => setLocale(value as any)}
              >
                <SelectTrigger className="h-9 w-[140px] rounded-full bg-[#163636] text-white border-transparent px-4 text-sm shadow-sm hover:bg-[#163636]/90">
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
        </header>

        {children}
      </main>
    </div>
  );
}
