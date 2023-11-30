import { notFound } from "next/navigation";
import { Metadata } from "next/types";

import { getPost, getCategoryPosts } from "@/sanity/sanity-utils";
import { PortableText } from "@/sanity/plugins/portabletext";
import ReadingProgressBar from "@/app/components/post/ReadingProgressBar";

import { Post } from "@/types/Post";
import category from "@/sanity/schemas/category";

type Props = {
  params: {
    postSlug: string;
    categorySlug: string;
  };
};

export async function generateMetadata({
  params: { postSlug, categorySlug },
}: Props): Promise<Metadata> {
  try {
    const post = await getPost(categorySlug, postSlug);

    if (!post)
      return {
        title: "Not found",
        description: "The post you are looking for does not exist.",
      };

    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch (error) {
    console.error(error);

    return {
      title: "Not found",
      description: "The post you are looking for does not exist.",
    };
  }
}

export async function generateStaticParams({
  params: { categorySlug },
}: Props) {
  const categoryPostsData: Promise<Post[]> = getCategoryPosts(categorySlug);

  const categoryPosts = await categoryPostsData;

  return categoryPosts.map(post => ({
    postSlug: post.slug.current,
  }));
}

export default async function Post({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { postSlug: string; categorySlug: string };
}) {
  return (
    <>
      <ReadingProgressBar />
      {children}
    </>
  );
}

// Enables statically generating routes at build time instead of on-demand at request time
// generateStaticParams can be placed in the page.tsx at the last route segment.
