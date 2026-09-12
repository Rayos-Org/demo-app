import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-blue-600/20 text-blue-400 border-blue-500/30",
    secondary: "bg-white/8 text-gray-300 border-white/10",
    destructive: "bg-red-600/20 text-red-400 border-red-500/30",
    outline: "border-white/15 text-gray-300",
    success: "bg-green-600/20 text-green-400 border-green-500/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
