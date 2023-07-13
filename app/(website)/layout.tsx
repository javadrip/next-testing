import { getSettings } from "@/sanity/client";
import Navbar from "../components/navigation/navbar";

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata() {
  const settings = await getSettings();

  return {
    title: {
      default: settings?.title || "TEMPLATE",
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

export default async function Layout({ children }: Props) {
  const settings = await getSettings();

  return (
    <>
      <Navbar {...settings} />
      <div>{children}</div>
    </>
  );
}
