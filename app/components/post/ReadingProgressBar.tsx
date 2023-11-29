"use client";

import { useReadingProgress } from "@/src/hooks/useReadingProgressbar";
import useScrollVisibility from "@/src/hooks/useScrollVisibility";

export default function ReadingProgressBar() {
  const completion = useReadingProgress();
  const show = useScrollVisibility();

  return (
    <header
      style={{
        backgroundSize: `${completion}%`,
        backgroundRepeat: "no-repeat",
      }}
      className={`fixed h-14 w-full bg-gradient-to-r from-red-500/30 from-30% to-blue-500/50 to-100% transition-all duration-500 ease-in-out z-50 ${
        show ? "top-0" : "-top-12"
      }`}
    ></header>
  );
}
