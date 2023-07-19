import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getAuthor } from "@/sanity/sanity-utils";
import { getAuthorPostsBySlug } from "@/sanity/client";

import PostListing from "@/app/components/post/PostListing";
import Container from "@/app/components/container";
import AuthorProfile from "./AuthorProfile";

import type { Author } from "@/types/Author";
import type { Post } from "@/types/Post";

type Props = {
  params: {
    authorSlug: string;
  };
};

// Using suspense to progressively render the page while the rest of the page loads
export default async function Author({ params: { authorSlug } }: Props) {
  // Both datasets are requested in parallel
  // const authorData: Promise<Author> = getAuthor(authorSlug);
  const authorPostsData: Promise<Post[]> = getAuthorPostsBySlug(authorSlug);

  // const author = await authorData;
  // console.log("author", author);
  // if (!author) notFound();

  const posts = await authorPostsData;

  return (
    <Container>
      <AuthorProfile authorSlug={authorSlug} />
      <br />
      <div className="grid gap-10 md:grid-cols-3 lg:gap-10 ">
        <Suspense fallback={<h2>Loading...</h2>}>
          {posts.map(post => (
            <PostListing key={post._id} post={post} aspect="square" />
          ))}
        </Suspense>
      </div>
      <div className="mt-10 flex justify-center">
        <Link
          href="/archive"
          className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
        >
          <span>View all Posts</span>
        </Link>
      </div>
    </Container>
  );
}
