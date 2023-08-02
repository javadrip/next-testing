import Container from "@/app/components/container";
import CategoryPageBanner from "./CategoryPageBanner";
import CategoryArchive from "./CategoryArchive";

import { getPaginatedPostsByCategory } from "@/sanity/client";

import type { Category } from "@/types/Category";
import type { Post } from "@/types/Post";

type Props = {
  params: {
    categorySlug: string;
  };
};

const POSTS_PER_PAGE = 3;

export default async function Category({ params: { categorySlug } }: Props) {
  const categoryPostsData: Promise<Post[]> = getPaginatedPostsByCategory(
    categorySlug,
    POSTS_PER_PAGE
  );

  const posts = await categoryPostsData;

  return (
    <Container>
      <CategoryPageBanner categorySlug={categorySlug} />
      <CategoryArchive posts={posts} categorySlug={categorySlug} />
    </Container>
  );
}
