import { Metadata } from "next/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PortableText } from "@portabletext/react";

import { getAuthor, getAuthorPosts } from "@/sanity/sanity-utils";
import { getAuthorPostsBySlug } from "@/sanity/client";

import PostsList from "@/app/components/post/PostsList";

import type { Author } from "@/types/Author";
import type { Post } from "@/types/Post";

type Props = {
  params: {
    authorSlug: string;
  };
};

export async function generateMetadata({
  params: { authorSlug },
}: Props): Promise<Metadata> {
  const author = await getAuthor(authorSlug);

  if (!author) notFound();

  return {
    title: author.name,
    description: `See all posts by ${author.name}`,
  };
}

// Using suspense to progressively render the page while the rest of the page loads
export default async function Author({ params: { authorSlug } }: Props) {
  // Both datasets are requested in parallel
  const authorData: Promise<Author> = getAuthor(authorSlug);
  const authorPostsData: Promise<Post[]> = getAuthorPostsBySlug(authorSlug);

  const author = await authorData;
  console.log("author", author);
  if (!author) notFound();

  return (
    <>
      Author name: {author.name} <br />
      Author slug: {author.slug.current} <br />
      Author bio: <PortableText value={author.bio} /> <br />
      <br />
      Author posts! <br />
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <PostsList promise={authorPostsData} />
      </Suspense>
    </>
  );
}

// Querying and rendering the page all at once
// export default async function Author({ params: { authorSlug } }: Props) {

//   const author = await getAuthor(authorSlug);

//   if (!author) notFound();

//   return (
//     <div>
//       Author name: {author.name} <br />
//       Author slug: {author.authorSlug} <br />
//       Author bio: <PortableText value={author.bio} /> <br />
//       Author posts: <br />
//       {author.posts.map(post => (
//         <>
//           Post title: {post.title} <br />
//           Post slug: {post.postSlug} <br />
//           Category: {post.category} <br />
//           Category slug: {post.categorySlug} <br />
//           Date posted: {post._createdAt} <br />
//           <br />
//         </>
//       ))}
//     </div>
//   );
// }
