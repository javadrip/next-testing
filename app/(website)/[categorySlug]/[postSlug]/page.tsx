import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@/sanity/plugins/portabletext";

import { parseISO, format } from "date-fns";
import speakingurl from "speakingurl";

import { getPost, getCategoryPosts } from "@/sanity/sanity-utils";
import { getPostHeadings } from "@/sanity/client";
import { urlForImage } from "@/lib/urlFor";

import Container from "@/app/components/container";
import CategoryLabel from "@/app/components/ui/CategoryLabel";
import AuthorCard from "@/app/components/post/AuthorCard";
import TableOfContents from "@/app/components/post/TableOfContents";

import { Post } from "@/types/Post";
import { Headings } from "@/types/Headings";

type Props = {
  params: {
    postSlug: string;
    categorySlug: string;
  };
};

// export async function generateStaticParams({
//   params: { categorySlug },
// }: Props) {
//   const categoryPostsData: Promise<Post[]> = getCategoryPosts(categorySlug);

//   const categoryPosts = await categoryPostsData;

//   return categoryPosts.map(post => ({
//     categorySlug: categorySlug,
//     postSlug: post.slug.current,
//   }));
// }

export default async function Post({
  params: { postSlug, categorySlug },
}: Props) {
  const post = await getPost(categorySlug, postSlug);

  if (!post) notFound();

  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;

  const imageProps = post?.mainImage ? urlForImage(post?.mainImage) : null;

  // const headingsData: Promise<Headings> = getPostHeadings(
  //   categorySlug,
  //   postSlug
  // );

  // const headings = (await headingsData).headings;

  return (
    <>
      <Container>
        <div className="mx-auto max-w-screen-md ">
          <div className="flex justify-center">
            <CategoryLabel categories={post.categories} />
          </div>

          <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
            {post.title}
          </h1>

          <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                {AuthorimageProps && (
                  <Link href={`/author/${post.author.slug.current}`}>
                    <Image
                      src={AuthorimageProps.src}
                      alt={post?.author?.name}
                      className="rounded-full object-cover"
                      fill
                      sizes="40px"
                    />
                  </Link>
                )}
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-400">
                  <Link href={`/author/${post.author.slug.current}`}>
                    {post.author.name}
                  </Link>
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <time
                    className="text-gray-500 dark:text-gray-400"
                    dateTime={post?.publishedAt || post._createdAt}
                  >
                    {format(
                      parseISO(post?.publishedAt || post._createdAt),
                      "MMMM dd, yyyy"
                    )}
                  </time>
                  <span>· {post.estReadingTime || "5"} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
        {imageProps && (
          <Image
            src={imageProps.src}
            alt={post.mainImage?.alt || "Thumbnail"}
            loading="eager"
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="mx-auto px-4 xl:grid xl:grid-cols-[25%_50%_25%]">
        <TableOfContents
        // postSlug={postSlug}
        // categorySlug={categorySlug}
        />
        <article className="mx-auto max-w-screen-md">
          <div className="prose mx-auto my-4 dark:prose-invert prose-a:text-blue-600">
            {post.body && <PortableText value={post.body} />}
          </div>
          <div className="mb-7 mt-7 flex justify-center">
            <Link
              href="/"
              className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 "
            >
              ← View all posts
            </Link>
          </div>
          {post.author && <AuthorCard author={post.author} />}
        </article>
      </div>
    </>
  );
}

// Enables statically generating routes at build time instead of on-demand at request time
// generateStaticParams can be placed in the page.tsx at the last route segment.
