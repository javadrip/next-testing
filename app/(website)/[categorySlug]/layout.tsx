import { notFound } from "next/navigation";

import { getCategory, getAllCategories } from "@/sanity/sanity-utils";

import { Metadata } from "next/types";
import type { Category } from "@/types/Category";

type Props = {
  params: {
    categorySlug: string;
  };
};

export async function generateMetadata({
  params: { categorySlug },
}: Props): Promise<Metadata> {
  const category = await getCategory(categorySlug);

  if (!category) notFound();

  return {
    title: category.title,
    description: `See all posts in ${category.title}`,
  };
}

// Enables statically generating routes (i.e. SSG) at build time instead of on-demand at request time
// Intermediate dynamic route segments need to be placed in layout.tsx
// Passes categorySlug params down to child [postSlug]/page.tsx for use in generateStaticParams
export async function generateStaticParams() {
  const categoriesData: Promise<Category[]> = getAllCategories();

  const categories = await categoriesData;

  return categories.map(category => ({ categorySlug: category.slug.current }));
}

export default function Category({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    category: string;
  };
}) {
  return <>{children}</>;
}
