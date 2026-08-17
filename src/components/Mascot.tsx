import type { ReactNode } from "react";
import mascot from "@/assets/sugarbuddy-mascot.png";
import { cn } from "@/lib/utils";

const sizes = { sm: "h-11 w-11", md: "h-20 w-20", lg: "h-32 w-32" };

export function Mascot({
  size = "md",
  className,
  priority = false,
}: {
  size?: keyof typeof sizes;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={mascot}
      alt="SugarBuddy mascot"
      width={816}
      height={816}
      loading={priority ? "eager" : "lazy"}
      className={cn(sizes[size], "object-contain drop-shadow-md", className)}
    />
  );
}

export function BuddySays({
  children,
  size = "sm",
}: {
  children: ReactNode;
  size?: keyof typeof sizes;
}) {
  return (
    <div className="flex items-start gap-3 rounded-3xl bg-secondary/60 p-4">
      <Mascot size={size} className="shrink-0" />
      <p className="pt-1 text-sm leading-relaxed text-secondary-foreground">{children}</p>
    </div>
  );
}