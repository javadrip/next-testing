"use client";

import useScrollProgress from "@/src/hooks/useScrollProgress";
import useScrollVisibility from "@/src/hooks/useScrollVisibility";

export default function ReadingProgressBar() {
  const scrollPercentage = useScrollProgress();
  const show = useScrollVisibility();

  return (
    <div
      style={{
        backgroundSize: `${scrollPercentage}%`,
        backgroundRepeat: "no-repeat",
      }}
      // `transition-[top]` determines how the top property changes over time. It is required to make sure the navbar slides in and out smoothly.
      className={`fixed h-14 w-full bg-gradient-to-r from-red-500/30 from-30% to-blue-500/50 to-100% transition-[top] ease-in-out delay-150 z-50 ${
        show ? "top-0" : "-top-12"
      }`}
    ></div>
  );
}
