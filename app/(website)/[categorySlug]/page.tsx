import CategoryArchive from "./CategoryArchive";

import type { Category } from "@/types/Category";

import { getPaginatedPostsByCategory } from "@/sanity/client";

type Props = {
  params: {
    categorySlug: string;
  };
};

const POSTS_PER_PAGE = 3;

export default async function Category({ params: { categorySlug } }: Props) {
  const posts = await getPaginatedPostsByCategory(categorySlug, POSTS_PER_PAGE);
  return <CategoryArchive posts={posts} categorySlug={categorySlug} />;
}
