import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeltaPillProps {
  value: number;        // ex : +5.2, -3.1, 0
  label?: string;       // ex : "vs mois dernier"
}

export default function DeltaPill({ value, label = "vs mois dernier" }: DeltaPillProps) {
  const isUp = value > 0;
  const isDown = value < 0;

  const baseClasses =
    "absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold";

  const colorClasses = isUp
    ? "bg-emerald-100 text-emerald-700"
    : isDown
    ? "bg-red-100 text-red-700"
    : "bg-amber-100 text-amber-700";

  const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;

  const formatted = `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;

  return (
    <div className={cn(baseClasses, colorClasses)}>
      <Icon className="h-3.5 w-3.5" />
      <span>{formatted}</span>
      <span className="hidden sm:inline text-[10px] font-normal opacity-80">
        {label}
      </span>
    </div>
  );
}
