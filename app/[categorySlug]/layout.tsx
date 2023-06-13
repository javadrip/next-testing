import { getAllCategories } from "@/sanity/sanity-utils";

import type { Category } from "@/types/Category";

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

// Enables statically generating routes at build time instead of on-demand at request time
// Intermediate dynamic route segments need to be placed in layout.tsx
// Passes categorySlug params down to child [postSlug]/page.tsx for use in generateStaticParams
export async function generateStaticParams() {
  const categoriesData: Promise<Category[]> = getAllCategories();

  const categories = await categoriesData;

  return categories.map(category => ({ categorySlug: category.categorySlug }));
}
