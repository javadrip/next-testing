import { notFound } from "next/navigation";
import { Suspense } from "react";

import type { Post } from "@/types/Post";

import { getAllPosts } from "@/sanity/client";
import PostsList from "@/app/components/post/PostsList";

export default async function Home() {
  const postsData: Promise<Post[]> = getAllPosts();

  const posts = await postsData;

  if (!posts) notFound();

  return (
    <>
      Homepage!
      <br />
      All posts: <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <PostsList promise={postsData} />
      </Suspense>
      {/* <button onClick={handleClick}>Load more</button> */}
    </>
  );
}
