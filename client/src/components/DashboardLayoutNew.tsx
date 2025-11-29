// client/src/components/DashboardLayoutNew.tsx
import * as React from "react";
import { SidebarNew } from "@/components/SidebarNew";

interface DashboardLayoutNewProps {
  title: string;
  children: React.ReactNode;
}

export default function DashboardLayoutNew({
  title,
  children,
}: DashboardLayoutNewProps) {
  return (
    <div className="min-h-screen flex bg-[var(--nk-sand-soft)]">
      {/* Sidebar à gauche */}
      <SidebarNew />

      {/* Contenu principal */}
      <main className="flex-1 px-6 py-6">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[var(--nk-ink)]">
            {title}
          </h1>
        </header>

        {children}
      </main>
    </div>
  );
}
