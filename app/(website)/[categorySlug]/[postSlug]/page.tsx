import { Metadata } from "next/types";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { getPost, getCategoryPosts } from "@/sanity/sanity-utils";

import { Post } from "@/types/Post";

type Props = {
  params: {
    postSlug: string;
    categorySlug: string;
  };
};

export async function generateMetadata({
  params: { postSlug, categorySlug },
}: Props): Promise<Metadata> {
  const page = await getPost(categorySlug, postSlug);
  console.log("page", page.categories);
  if (!page) notFound();

  return {
    title: page.title,
    description: page.excerpt,
  };
}

export default async function Post({
  params: { postSlug, categorySlug },
}: Props) {
  const page = await getPost(categorySlug, postSlug);

  if (!page) notFound();

  return (
    <div>
      Post title: {page.title} <br />
      Post slug: {page.postSlug} <br />
      Category: {page.categories[0].title} <br />
      Category slug: {page.categorySlug} <br />
      Author name: {page.author.name} <br />
      Author slug: {page.author.slug.current} <br />
      Post content: <PortableText value={page.body} /> <br />
      Post categories: {page.categories.map(category => category.title + " ")}
    </div>
  );
}

// Enables statically generating routes at build time instead of on-demand at request time
// generateStaticParams can be placed in the page.tsx at the last route segment.
export async function generateStaticParams({
  params: { categorySlug },
}: Props) {
  const categoryPostsData: Promise<Post[]> = getCategoryPosts(categorySlug);

  const categoryPostsDict = await categoryPostsData;

  const categoryPosts = Object.values(categoryPostsDict);

  return categoryPosts.map(post => ({
    params: {
      postSlug: post.slug,
    },
  }));
}
