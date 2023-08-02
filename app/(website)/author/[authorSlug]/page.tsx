import { notFound } from "next/navigation";
import { Suspense } from "react";

import Container from "@/app/components/container";
import AuthorProfile from "./AuthorProfile";
import AuthorPosts from "./AuthorPosts";

import { getPaginatedAuthorPostsBySlug } from "@/sanity/client";

import type { Author } from "@/types/Author";
import type { Post } from "@/types/Post";

type Props = {
  params: {
    authorSlug: string;
  };
};

const POSTS_PER_PAGE = 3;

// Using suspense to progressively render the page while the rest of the page loads
export default async function Author({ params: { authorSlug } }: Props) {
  // Both datasets are requested in parallel
  // const authorData: Promise<Author> = getAuthor(authorSlug);
  const authorPostsData: Promise<Post[]> = getPaginatedAuthorPostsBySlug(
    authorSlug,
    POSTS_PER_PAGE
  );

  // const author = await authorData;
  // console.log("author", author);
  // if (!author) notFound();

  const posts = await authorPostsData;

  return (
    <Container>
      <AuthorProfile authorSlug={authorSlug} />
      <AuthorPosts posts={posts} authorSlug={authorSlug} />
    </Container>
  );
}
