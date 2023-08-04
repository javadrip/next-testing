import Link from "next/link";
import Image from "next/image";

import { parseISO, format } from "date-fns";
import clsx from "clsx";

import { urlForImage } from "@/lib/urlFor";
import CategoryLabel from "../ui/CategoryLabel";

import type { Post } from "@/types/Post";

import { PhotoIcon } from "@heroicons/react/24/outline";

type Props = {
  post: Post;
  aspect?: "landscape" | "square" | "4/3";
  aspectLg?: "landscape" | "square" | "4/3";
  minimal?: boolean;
  pathPrefix?: string;
  preloadImage?: boolean;
  fontSize?: "large" | "normal" | "small";
  fontWeight?: "normal" | "bold";
  hideCategoryLabel?: boolean;
  hideAuthor?: boolean;
  hideDate?: boolean;
  hidePostImage?: boolean;
};

export default function PostListing({
  post,
  aspect,
  aspectLg,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight,
  hideCategoryLabel,
  hideAuthor,
  hideDate,
  hidePostImage,
}: Props) {
  const imageProps = post?.mainImage ? urlForImage(post?.mainImage) : null;

  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;

  return (
    <div
      className={clsx(
        "group cursor-pointer flex flex-col justify-between",
        minimal && "grid gap-10 md:grid-cols-2"
      )}
    >
      <div>
        {/* FEATURED IMAGE */}
        <div
          className={clsx(
            "overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800",
            hidePostImage && "hidden"
          )}
        >
          <Link
            className={clsx(
              "relative block",
              aspect === "4/3"
                ? "aspect-video lg:aspect-4/3"
                : aspect === "square"
                ? "aspect-video lg:aspect-square"
                : "aspect-video"
            )}
            href={`/${post.categorySlug}/${pathPrefix ? `${pathPrefix}/` : ""}${
              post.slug.current
            }`}
          >
            {imageProps ? (
              <Image
                src={imageProps.src}
                alt={post.mainImage.alt || "Thumbnail"}
                priority={preloadImage ? true : false}
                className="object-cover transition-all"
                fill
                sizes="(max-width: 768px) 30vw, 33vw"
              />
            ) : (
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                <PhotoIcon />
              </span>
            )}
          </Link>
        </div>

        <div className={clsx(minimal && "flex items-center")}>
          {/* CATEGORIES */}
          <CategoryLabel
            categories={post.categories}
            hideCategoryLabel={hideCategoryLabel}
          />
          {/* ARTICLE TITLE */}
          <h2
            className={clsx(
              fontSize === "large"
                ? "text-2xl line-clamp-2 font-medium tracking-tight"
                : fontSize === "small"
                ? "text-base line-clamp-3 font-medium leading-snug tracking-tight text-black"
                : "text-lg line-clamp-3 font-medium leading-snug tracking-tight",
              // fontWeight === "normal" ? "" : "",
              "mt-2"
            )}
          >
            <Link
              href={`/${post.categorySlug}/${
                pathPrefix ? `${pathPrefix}/` : ""
              }${post.slug.current}`}
            >
              <span
                className="bg-gradient-to-r from-green-300 to-green-100 bg-[length:0px_10px] bg-left-bottom
                bg-no-repeat
                transition-[background-size]
                duration-500
                hover:bg-[length:100%_3px]
                group-hover:bg-[length:100%_10px]
                dark:from-purple-800 dark:to-purple-900"
              >
                {post.title}
              </span>
            </Link>
          </h2>

          {/* EXCERPT: currently hidden */}
          <div className="hidden">
            {post.excerpt && (
              <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                <Link
                  href={`/${post.categorySlug}/${
                    pathPrefix ? `${pathPrefix}/` : ""
                  }${post.slug.current}`}
                  legacyBehavior
                >
                  {post.excerpt}
                </Link>
              </p>
            )}
          </div>

          {/* AUTHOR AND DATE */}
        </div>
      </div>
      <div
        className={clsx(
          "flex items-center text-gray-500 dark:text-gray-400",
          !hideAuthor && !hideDate && "mt-3"
        )}
      >
        <Link
          href={`/author/${post.author.slug.current}`}
          className={clsx(hideAuthor && "hidden")}
        >
          <div className="flex items-center gap-3">
            <div className="relative h-5 w-5 flex-shrink-0">
              {AuthorimageProps && (
                <Image
                  src={AuthorimageProps.src}
                  alt={post?.author?.name}
                  className="rounded-full object-cover"
                  fill
                  sizes="20px"
                />
              )}
            </div>
            <span className="truncate text-sm">{post.author.name}</span>
          </div>
        </Link>
        {!hideAuthor && !hideDate && (
          <span className="text-xs text-gray-300 dark:text-gray-600 px-2">
            &bull;
          </span>
        )}
        <time
          className={clsx("truncate text-sm", hideDate && "hidden")}
          dateTime={post?.publishedAt || post._createdAt}
        >
          {format(
            parseISO(post?.publishedAt || post._createdAt),
            "MMMM dd, yyyy"
          )}
        </time>
      </div>
    </div>
  );
}
