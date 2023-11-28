import { Suspense } from "react";
import Link from "next/link";

import type { Post } from "@/types/Post";

import { getAllPosts, getFeaturedPosts } from "@/sanity/client";
import SectionHeader from "../components/ui/SectionHeader";
import PostListing from "../components/post/PostListing";

import Container from "../components/container";

export default async function Home() {
  // Use Promise.all() to fetch all posts and featured posts
  // QN: Is this the way to implement Promise.all()?
  const [posts, featuredPosts] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
  ]);

  // Promises could be stacked this way too, but not ideal:
  // const postsData: Promise<Post[]> = getAllPosts();
  // const featuredPostsData: Promise<Post[]> = getFeaturedPosts();

  // const posts = await postsData;
  // const featuredPosts = await featuredPostsData;

  return (
    <Container>
      {/* ABOVE THE FOLD FEATURED POST AREA */}
      <SectionHeader text="Featured" style="large" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {/* PICKS POSTS TO THE LEFT */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-4">
          <Suspense fallback={<h2>Loading...</h2>}>
            {/* Gets the second and third featured posts */}
            {featuredPosts.slice(1, 3).map(post => (
              <PostListing
                key={post._id}
                post={post}
                aspect="landscape"
                fontSize="small"
                preloadImage={true}
              />
            ))}
          </Suspense>
        </div>

        {/* FEATURED POST ON THE RIGHT*/}
        <div className="col-span-2 md:col-span-3 lg:col-span-2 row-start-1 md:col-start-1 lg:row-auto">
          <Suspense fallback={<h2>Loading...</h2>}>
            {/* Gets the first featured post */}
            {featuredPosts.slice(0, 1).map(post => (
              <PostListing
                key={post._id}
                post={post}
                aspect="4/3"
                preloadImage={true}
                fontSize="large"
                fontWeight="normal"
              />
            ))}
          </Suspense>
        </div>
      </div>

      {/* RECENT POSTS TO THE BOTTOM */}
      <SectionHeader text="Latest" />
      <div className="col-span-2 md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Suspense fallback={<h2>Loading...</h2>}>
          {/* TODO: Gets the first 4 most recent posts */}
          {posts.slice(3, 7).map(post => (
            <PostListing
              key={post._id}
              post={post}
              aspect="4/3"
              preloadImage={true}
              hideCategoryLabel={true}
              hideAuthor={true}
              hideDate={true}
              fontSize="small"
              fontWeight="normal"
            />
          ))}
        </Suspense>
      </div>

      {/* LATEST POSTS */}
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<h2>Loading...</h2>}>
          {/* TODO: Gets the next 12 most recent posts */}
          {posts.slice(2, 14).map(post => (
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
