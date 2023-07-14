import "@/styles/tailwind.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import GoogleAnalytics from "./components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vin's Next App Playground",
  description: "Here's the global default meta description of the website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Google Analytics is wrapped in Suspense boundary to prevent "Entire page /[categorySlug] deopted into client-side rendering." warning   */}
      <Suspense>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-ZR0JGWPLQ6" />
      </Suspense>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
