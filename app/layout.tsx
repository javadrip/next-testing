import "./globals.css";
import { Inter } from "next/font/google";

import GoogleAnalytics from "./components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welcome to Vin's Next App Playground",
  description: "Here's the global default meta description of the website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_MEASUREMENT_ID="G-ZR0JGWPLQ6" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
