import React from "react";
import { cn } from "../../lib/utils";

const sizeStyles = {
  sm: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
  md: { padding: "0.6rem 1.4rem", fontSize: "1rem" },
  lg: { padding: "0.8rem 1.8rem", fontSize: "1.125rem" },
};

export const ShineButton = ({
  label = "Shine now",
  onClick,
  className = "",
  size = "md",
  bgColor = "linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)",
}) => {
  const { padding, fontSize } = sizeStyles[size] || sizeStyles.md;

  const backgroundImage = bgColor.startsWith("linear-gradient")
    ? bgColor
    : `linear-gradient(to right, ${bgColor}, ${bgColor})`;

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative text-white font-medium rounded-md min-w-[120px] min-h-[44px] transition-all duration-700 ease-in-out overflow-hidden border border-white/10 cursor-pointer backdrop-blur-md",
        "bg-white/5 shadow-[0px_8px_32px_rgba(0,0,0,0.37)]",
        "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-500",
        "hover:bg-white/10 active:scale-95 group",
        className
      )}
      style={{
        backgroundImage,
        backgroundSize: "280% auto",
        backgroundPosition: "initial",
        fontSize,
        padding,
        transition: "0.8s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget).style.backgroundPosition = "right top")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget).style.backgroundPosition = "initial")
      }
    >
      <span className="relative z-20">{label}</span>

      {/* Premium Shine effect - Gradient instead of solid color */}
      <div
        className="absolute top-0 -left-[100%] w-[50%] h-full 
        bg-gradient-to-r from-transparent via-white/20 to-transparent 
        skew-x-[-25deg] animate-shine pointer-events-none z-10"
      />
    </button>
  );
};
