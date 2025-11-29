import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Variants de style pour tous les boutons
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // 👉 Bouton CTA jaune (Ajout de propriété, actions principales)
        default:
          "bg-[#D9B43A] text-white border-0 shadow-[6px_6px_0_0_#1E3D3D] " +
          "hover:bg-[#c89e2f] hover:shadow-[4px_4px_0_0_#1E3D3D] " +
          "active:bg-[#b08a28] active:shadow-[2px_2px_0_0_#1E3D3D] " +
          "transition-transform hover:translate-x-[1px] hover:translate-y-[1px] " +
          "active:translate-x-[2px] active:translate-y-[2px]",

        // 👉 Boutons verts (Filtre, Chercher, petits boutons d’action)
        secondary:
          "bg-[#1E3D3D] text-white rounded-full px-5 py-2 " +
          "hover:bg-[#1E3D3D] hover:text-[#D9B43A]",

        // 👉 Onglets style menu NkriDari.fr (barre verte, texte blanc, actif jaune)
        nav:
          "inline-flex items-center justify-center px-6 py-3 text-base font-semibold " +
          "rounded-xl transition-all text-white/90 bg-transparent " +
          "hover:text-[#D9B43A] " +
          "data-[active=true]:text-[#D9B43A] data-[active=true]:bg-[#0F2A2A] " +
          "data-[active=true]:shadow-[0_0_0_2px_#B78A67]",

        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-transparent shadow-xs hover:bg-accent dark:bg-transparent dark:border-input dark:hover:bg-input/50",
        ghost: "hover:bg-accent dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Composant Button réutilisable partout
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        data-slot="button"
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
