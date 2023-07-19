import { Metadata } from "next/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PortableText } from "@portabletext/react";

import { getAuthor } from "@/sanity/sanity-utils";
import { getAuthorPostsBySlug } from "@/sanity/client";

import PostListing from "@/app/components/post/PostListing";
import Container from "@/app/components/container";

import type { Author } from "@/types/Author";
import type { Post } from "@/types/Post";

type Props = {
  params: {
    authorSlug: string;
  };
};

export async function generateMetadata({
  params: { authorSlug },
}: Props): Promise<Metadata> {
  const author = await getAuthor(authorSlug);

  if (!author) notFound();

  return {
    title: author.name,
    description: `See all posts by ${author.name}`,
  };
}

// TODO: Edit to author
// export async function generateStaticParams() {
//   const categoriesData: Promise<Author[]> = getAllCategories();

//   const categories = await categoriesData;

//   return categories.map(category => ({ categorySlug: category.slug.current }));
// }

// Using suspense to progressively render the page while the rest of the page loads
export default function Author({
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
