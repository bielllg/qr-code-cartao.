import React from "react";
import { cn } from "../lib/utils";

export function AuroraTextEffect({
  text,
  className,
  textClassName,
  fontSize,
  colors = {
    first: "bg-orange-500",
    second: "bg-amber-400",
    third: "bg-blue-500",
    fourth: "bg-white",
  },
  blurAmount = "blur-lg",
  animationSpeed = {
    border: 6,
    first: 5,
    second: 5,
    third: 3,
    fourth: 13,
  },
}) {
  const maskId = React.useId().replace(/:/g, "");

  const keyframes = `
    @keyframes aurora-1 {
      0% { top: 0; right: 0; }
      50% { top: 100%; right: 75%; }
      75% { top: 100%; right: 25%; }
      100% { top: 0; right: 0; }
    }
    @keyframes aurora-2 {
      0% { top: -50%; left: 0%; }
      60% { top: 100%; left: 75%; }
      85% { top: 100%; left: 25%; }
      100% { top: -50%; left: 0%; }
    }
    @keyframes aurora-3 {
      0% { bottom: 0; left: 0; }
      40% { bottom: 100%; left: 75%; }
      65% { bottom: 40%; left: 50%; }
      100% { bottom: 0; left: 0; }
    }
    @keyframes aurora-4 {
      0% { bottom: -50%; right: 0; }
      50% { bottom: 0%; right: 40%; }
      90% { bottom: 50%; right: 25%; }
      100% { bottom: -50%; right: 0; }
    }
    @keyframes aurora-border {
      0% { border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%; }
      25% { border-radius: 47% 29% 39% 49% / 61% 19% 66% 26%; }
      50% { border-radius: 57% 23% 47% 72% / 63% 17% 66% 33%; }
      75% { border-radius: 28% 49% 29% 100% / 93% 20% 64% 25%; }
      100% { border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%; }
    }
  `;

  return (
    <span
      className={cn(
        "relative inline-block leading-none pb-1 md:pb-2",
        className
      )}
    >
      <style>{keyframes}</style>

      {/* 
          This hidden text layer is the "source of truth" for the width and height 
          available to the SVG. It ensures the layout doesn't jump.
      */}
      <span
        className={cn(
          "inline-block opacity-0 pointer-events-none select-none",
          textClassName
        )}
        style={{ fontSize }}
      >
        {text}
      </span>

      {/* 
          The SVG container covers the exact area of the text.
          We use dominant-baseline="central" and y="50%" for centering,
          but note that SVG text rendering can vary, so the "dy" adjustment 
          might be needed for specific fonts.
      */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        style={{ zIndex: 10 }}
      >
        <defs>
          <mask id={maskId}>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              className={textClassName}
              fill="white"
              style={{
                fontSize: "1em",
                fontFamily: "inherit",
              }}
            >
              {text}
            </text>
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          <foreignObject width="100%" height="100%">
            {/* Using bg-purple-950 as a solid base for better purple/white contrast */}
            <div className="relative w-full h-full overflow-hidden pointer-events-none bg-purple-950">
              <div
                className={cn(
                  "absolute w-[200%] h-[200%] rounded-[37%_29%_27%_27%/28%_25%_41%_37%] filter",
                  colors.first,
                  blurAmount
                )}
                style={{
                  animationName: "aurora-border, aurora-1",
                  animationDuration: `${animationSpeed.border}s, ${animationSpeed.first}s`,
                  animationTimingFunction: "ease-in-out, ease-in-out",
                  animationIterationCount: "infinite, infinite",
                  animationDirection: "normal, alternate",
                }}
              />
              <div
                className={cn(
                  "absolute w-[200%] h-[200%] rounded-[37%_29%_27%_27%/28%_25%_41%_37%] filter",
                  colors.second,
                  blurAmount
                )}
                style={{
                  animationName: "aurora-border, aurora-2",
                  animationDuration: `${animationSpeed.border}s, ${animationSpeed.second}s`,
                  animationTimingFunction: "ease-in-out, ease-in-out",
                  animationIterationCount: "infinite, infinite",
                  animationDirection: "normal, alternate",
                }}
              />
              <div
                className={cn(
                  "absolute w-[200%] h-[200%] rounded-[37%_29%_27%_27%/28%_25%_41%_37%] filter",
                  colors.third,
                  blurAmount
                )}
                style={{
                  animationName: "aurora-border, aurora-3",
                  animationDuration: `${animationSpeed.border}s, ${animationSpeed.third}s`,
                  animationTimingFunction: "ease-in-out, ease-in-out",
                  animationIterationCount: "infinite, infinite",
                  animationDirection: "normal, alternate",
                }}
              />
              <div
                className={cn(
                  "absolute w-[200%] h-[200%] rounded-[37%_29%_27%_27%/28%_25%_41%_37%] filter",
                  colors.fourth,
                  blurAmount
                )}
                style={{
                  animationName: "aurora-border, aurora-4",
                  animationDuration: `${animationSpeed.border}s, ${animationSpeed.fourth}s`,
                  animationTimingFunction: "ease-in-out, ease-in-out",
                  animationIterationCount: "infinite, infinite",
                  animationDirection: "normal, alternate",
                }}
              />
            </div>
          </foreignObject>
        </g>
      </svg>

      {/* WHITE NEON UNDERLINE */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] md:h-[3px] bg-white rounded-full z-20"
        style={{
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.5)',
        }}
      />
    </span>
  );
}
