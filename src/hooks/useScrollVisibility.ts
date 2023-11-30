import { useState, useEffect } from "react";

// Hides the component when scrolling down, shows when scrolling up.
export default function useScrollVisibility() {
  const [showComponent, setShowComponent] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowComponent(false);
      } else {
        // Scrolling up
        setShowComponent(true);
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  });

  return showComponent;
}
