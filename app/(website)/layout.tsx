import { getSettings } from "@/sanity/client";

import Navbar from "@/app/components/navigation/Navbar";
import Footer from "@/app/components/footer";

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata() {
  const settings = await getSettings();

  return {
    title: {
      default: settings?.title || "TEMPLATE",
      // NOTE: Template only applies to direct child route
      template: "%s | TEMPLATE",
    },
    description: settings?.description || "DESCRIPTION",
    keywords: ["KEYWORDS"],
    authors: [{ name: "Vin" }],
    canonical: settings?.url,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children }: Props) {
  const settings = await getSettings();

  return (
    <>
      <Navbar {...settings} />
      <div>{children}</div>
      <Footer {...settings} />
    </>
  );
}
