"use client";

import useScrollProgress from "@/src/hooks/useScrollProgress";
import useScrollVisibility from "@/src/hooks/useScrollVisibility";

// TODO: Remove this component when progress bar is fully integrated with navbar
export default function ReadingProgressBar() {
  const scrollPercentage = useScrollProgress();
  const showComponent = useScrollVisibility();

  return (
    <div
      style={{
        backgroundSize: `${scrollPercentage}%`,
        backgroundRepeat: "no-repeat",
      }}
      // `transition-[top]` determines how the top property changes over time. It is required to make sure the navbar slides in and out smoothly.
      // z-40 puts the progress bar just under the navbar. Navbar has z-50.
      className={`fixed h-16 w-full bg-gradient-to-r from-red-500/30 from-30% to-blue-500/50 to-100% transition-[top] ease-in-out delay-150 z-40 ${
        showComponent ? "top-0" : "-top-14"
      }`}
    ></div>
  );
}
