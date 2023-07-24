import CategoryArchive from "./CategoryArchive";

import Container from "@/app/components/container";
import { getPaginatedPostsByCategory } from "@/sanity/client";
import { getCategoryTitleBySlug } from "@/sanity/client";

import type { Category } from "@/types/Category";

type Props = {
  params: {
    categorySlug: string;
  };
};

const POSTS_PER_PAGE = 3;

export default async function Category({ params: { categorySlug } }: Props) {
  const posts = await getPaginatedPostsByCategory(categorySlug, POSTS_PER_PAGE);

  const categoryTitle = await getCategoryTitleBySlug(categorySlug);

  return (
    <Container>
      <CategoryArchive
        posts={posts}
        categorySlug={categorySlug}
        categoryTitle={categoryTitle}
      />
    </Container>
  );
}
