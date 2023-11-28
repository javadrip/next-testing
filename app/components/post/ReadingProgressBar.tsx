"use client";

import { useReadingProgress } from "@/src/hooks/useReadingProgressbar";

export default function ReadingProgressBar() {
  const completion = useReadingProgress();

  return (
    <header
      style={{
        backgroundSize: `${completion}%`,
        backgroundRepeat: "no-repeat",
      }}
      className="fixed top-0 h-14 w-full bg-gradient-to-r from-red-500/30 from-30% to-blue-500/50 to-100% transition-all duration-500 ease-in-out z-10"
    ></header>
  );
}
