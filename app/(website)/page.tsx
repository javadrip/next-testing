import { Suspense } from "react";
import Link from "next/link";

import type { Post } from "@/types/Post";

import { getAllPosts } from "@/sanity/client";
import PostListing from "../components/post/PostListing";
import Container from "../components/container";

export default async function Home() {
  const postsData: Promise<Post[]> = getAllPosts();

  const posts = await postsData;

  // const [posts, setPosts] = useState<Post[]>([]);
  // const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);

  /**
   * Fetches all posts from Sanity
   * updates post state
   */
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const postsData = await getAllPosts();
  //     setPosts(postsData);
  //   };
  //   fetchPosts();
  // }, []);

  /**
   * Fetches all featured posts from Sanity
   * updates featuredPost state
   */
  // useEffect(() => {
  //   const fetchFeaturedPosts = async () => {
  //     // TODO: Create getAllFeaturedPosts function
  //     const postsData = await getAllFeaturedPosts();
  //     setPosts(postsData);
  //   };
  //   fetchFeaturedPosts();
  // }, []);

  return (
    <Container>
      {/* <FeaturedPosts posts={featuredPosts} />
          <Posts posts={posts} /> */}

      {/* <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
            <Suspense fallback={<h2>Loading...</h2>}>
              {featuredPosts.map(post => (
                <PostListing key={post._id} post={post} />
              ))}
            </Suspense>
          </div> */}

      <div className="grid gap-8 md:grid-cols-2">
        <Suspense fallback={<h2>Loading...</h2>}>
          {posts.slice(0, 2).map(post => (
            <PostListing
              key={post._id}
              post={post}
              aspect="landscape"
              preloadImage={true}
            />
          ))}
        </Suspense>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3 ">
        <Suspense fallback={<h2>Loading...</h2>}>
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
