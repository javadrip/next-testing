// "use client";

import { notFound } from "next/navigation";
import { Suspense, useState } from "react";

import {
  getCategory,
  getCategoryPosts,
  getNextTwoPosts,
} from "@/sanity/sanity-utils";

import { getPaginatedPostsByCategory } from "@/sanity/client";

import CategoryPosts from "@/app/components/post/CategoryPosts";
import type { Category } from "@/types/Category";
import type { Post } from "@/types/Post";

type Props = {
  params: {
    categorySlug: string;
  };
};

const POSTS_PER_PAGE = 3;

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

  return (
    <>
      Category title: {category.title} <br />
      Category slug: {category.slug.current} <br />
      <br />
      Category posts: <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <CategoryPosts promise={categoryPostsData} />
      </Suspense>
      {/* <button onClick={handleClick}>Load more</button> */}
    </>
  );
}
