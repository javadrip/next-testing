// "use client";

import { notFound } from "next/navigation";
import { Suspense, useState } from "react";

import {
  getCategory,
  getCategoryPosts,
  getNextTwoPosts,
} from "@/sanity/sanity-utils";
import { getPaginatedPostsByCategory } from "@/sanity/client";

import PostListing from "@/app/components/post/PostListing";
import Container from "@/app/components/container";

import type { Category } from "@/types/Category";
import type { Post } from "@/types/Post";

type Props = {
  params: {
    categorySlug: string;
  };
};

const POSTS_PER_PAGE = 6;

export default async function Category({ params: { categorySlug } }: Props) {
  // // useState here to track latest _id (consider using _createdAt) of posts (starts with null)
  // // Once page is loaded, calls loadPost
  // const [lastId, setLastId] = useState(null);

  const categoryData: Promise<Category> = getCategory(categorySlug);
  const categoryPostsData: Promise<Post[]> = getPaginatedPostsByCategory(
    categorySlug,
    POSTS_PER_PAGE
  );

  const category = await categoryData;
  // // handleClick button
  // // - calls loadPost
  // const handleClick = () => {
  //   console.log("handleClick");
  //   loadPost();
  // };

  // // loadPost function to load more posts
  // // - call the api and pass it lastId(fetch)
  // // - update the dom with new posts
  // // - update lastId state
  // const loadPost = () => {
  //   getNextTwoPosts(categorySlug);
  //   console.log("lastId", lastId);
  //   console.log("categoryPostsData", categoryPostsData);
  //   setLastId(lastId);
  // };

  if (!category) notFound();

  const posts = await categoryPostsData;

  return (
    <Container>
      Category title: {category.title} <br />
      Category slug: {category.slug.current} <br />
      <br />
      Category posts: <br />
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
        <Suspense fallback={<h2>Loading...</h2>}>
          {posts.map(post => (
            <PostListing key={post._id} post={post} />
          ))}
        </Suspense>
      </div>
      {/* <button onClick={handleClick}>Load more</button> */}
    </Container>
  );
}
