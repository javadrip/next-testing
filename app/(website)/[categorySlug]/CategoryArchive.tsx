"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { paginatedpostsbycatquery } from "@/sanity/groq";
import PostListing from "@/app/components/post/PostListing";
import useSWR, { SWRConfig } from "swr";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { fetcher } from "@/sanity/client";

import { Post } from "@/types/Post";

interface Props {
  posts: Post[];
  categorySlug: string;
}

export default function CategoryArchive({
  posts: initialposts,
  categorySlug,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  // TODO: Is "" in parseInt(page || "") correct?
  const pageIndex = parseInt(page || "") || 1;

  const POSTS_PER_PAGE = 3;

  const [isLoading, setIsLoading] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  // [(($pageIndex - 1) * 10)...$pageIndex * 10]{
  const paramsForQuery = {
    pageIndex: (pageIndex - 1) * POSTS_PER_PAGE,
    limit: pageIndex * POSTS_PER_PAGE,
    categorySlug: categorySlug,
  };

  // const fetcher = (query, params) =>
  //   client && client.fetch(query, params);

  const {
    data: posts,
    error,
    isValidating,
  } = useSWR([paginatedpostsbycatquery, paramsForQuery], fetcher, {
    fallbackData: initialposts,
    onSuccess: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    setIsFirstPage(pageIndex < 2);
  }, [pageIndex]);

  useEffect(() => {
    setIsLastPage(posts.length < POSTS_PER_PAGE);
  }, [posts]);

  const handleNextPage = () => {
    router.push(`/${categorySlug}?page=${pageIndex + 1}`);
  };

  const handlePrevPage = () => {
    router.push(`/${categorySlug}?page=${pageIndex - 1}`);
  };

  return (
    <>
      {posts && posts?.length === 0 && (
        <div className="flex h-40 items-center justify-center">
          <span className="text-lg text-gray-500">End of the result!</span>
        </div>
      )}

      {isValidating && (
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {/* TODO: Is it okay to use null in fill()? */}
          {new Array(6).fill(null).map((item, index) => (
            <div key={index}>
              <SkeletonImg />
            </div>
          ))}
        </div>
      )}
      {posts && !isLoading && !isValidating && (
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {posts.map((post: Post) => (
            <PostListing key={post._id} post={post} aspect="square" />
          ))}
        </div>
      )}
      <div className="mt-10 flex items-center justify-center">
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            disabled={isFirstPage}
            onClick={handlePrevPage}
            className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
          >
            <ChevronLeftIcon className="h-3 w-3" aria-hidden="true" />
            <span>Previous</span>
          </button>
          <button
            onClick={handleNextPage}
            disabled={isLastPage}
            className="relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
          >
            <span>Next</span>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </>
  );
}

const SkeletonImg = () => {
  const style = `
   .dark svg#skeleton #colorbase {
      stop-color: #2d2d2d;
    }
    .dark svg#skeleton #colorhighlight {
      stop-color: #3d3d3d;
    }
`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      id="skeleton"
      aria-labelledby="loading-aria"
      viewBox="0 0 500 800"
      preserveAspectRatio="none"
    >
      <title id="loading-aria">Loading...</title>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath="url(#clip-path)"
        style={{ fill: 'url("#fill")' }}
      />
      <defs>
        <clipPath id="clip-path">
          <rect x="0" y="0" rx="2" ry="2" width="505" height="505" />
          <rect x="0" y="623" rx="0" ry="0" width="480" height="18" />
          <rect x="0" y="568" rx="0" ry="0" width="154" height="21" />
          <rect x="-10" y="433" rx="2" ry="2" width="365" height="1" />
          <rect x="60" y="756" rx="0" ry="0" width="164" height="27" />
          <rect x="277" y="763" rx="0" ry="0" width="179" height="14" />
          <circle cx="20" cy="769" r="18" />
          <circle cx="250" cy="770" r="4" />
          <rect x="0" y="664" rx="0" ry="0" width="365" height="18" />
          <rect x="0" y="705" rx="0" ry="0" width="193" height="18" />
        </clipPath>
        <linearGradient id="fill">
          <stop
            offset="0.599964"
            stopColor="#f0f0f0"
            stopOpacity="1"
            id="colorbase"
          >
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop
            offset="1.59996"
            stopColor="#f7f7f7"
            stopOpacity="1"
            id="colorhighlight"
          >
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop
            offset="2.59996"
            stopColor="#f0f0f0"
            stopOpacity="1"
            id="colorbase"
          >
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
