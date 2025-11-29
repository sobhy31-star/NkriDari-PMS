import { ReactNode } from "react";
import { SidebarNew } from "./SidebarNew";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Loader2, Menu } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import { Button } from "./ui/button";

interface DashboardLayoutCustomProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayoutCustom({
  children,
  title,
}: DashboardLayoutCustomProps) {
  const { user, loading, isAuthenticated } = useSupabaseAuth();
  const { toggleSidebar } = useSidebar();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--nk-beige)]">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--nk-terracotta)]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="nk-app-root flex min-h-screen bg-[var(--nk-beige)]">
      <SidebarNew />

      <div className="nk-app-main flex flex-1 flex-col overflow-hidden min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--nk-border)] bg-[var(--nk-beige)] px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            {title && (
              <h2 className="text-2xl font-semibold text-[var(--nk-ink)]">
                {title}
              </h2>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--nk-ink)]">
              {user?.email}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1280px] px-6 py-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

