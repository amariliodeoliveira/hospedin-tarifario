import { useEffect, useState } from "react";

// Breakpoints aligned with Tailwind CSS v4 defaults.
// Update here if customized in globals.css.
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

export function useIsMobile(breakpoint: Breakpoint = "lg") {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`)
      .matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`,
    );

    function handleChange(e: MediaQueryListEvent) {
      setIsMobile(e.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isMobile;
}
