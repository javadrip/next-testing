import { Metadata } from "next/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  getCategory,
  getCategoryPosts,
  getNextTwoPosts,
} from "@/sanity/sanity-utils";

import CategoryPosts from "@/app/components/post/CategoryPosts";
import type { Category } from "@/types/Category";
import type { Post } from "@/types/Post";

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
    title: category.category,
    description: `See all posts in ${category.category}`,
  };
}

export default async function Category({ params: { categorySlug } }: Props) {
  const categoryData: Promise<Category> = getCategory(categorySlug);
  const categoryPostsData: Promise<Post[]> = getNextTwoPosts(categorySlug);

  const category = await categoryData;

  if (!category) notFound();

  return (
    <>
      Category name: {category.category} <br />
      Category slug: {category.categorySlug} <br />
      <br />
      Category posts: <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <CategoryPosts promise={categoryPostsData} />
      </Suspense>
    </>
  );
}
