import CategoryArchive from "./CategoryArchive";

import Container from "@/app/components/container";
import { getPaginatedPostsByCategory } from "@/sanity/client";

import type { Category } from "@/types/Category";
import CategoryPageBanner from "./CategoryPageBanner";

type Props = {
  params: {
    categorySlug: string;
  };
};

const POSTS_PER_PAGE = 3;

export default async function Category({ params: { categorySlug } }: Props) {
  const posts = await getPaginatedPostsByCategory(categorySlug, POSTS_PER_PAGE);

  return (
    <Container>
      <CategoryPageBanner categorySlug={categorySlug} />
      <CategoryArchive posts={posts} categorySlug={categorySlug} />
    </Container>
  );
}
