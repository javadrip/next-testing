import { notFound } from "next/navigation";
import { Metadata } from "next/types";

import { getPost } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";

type Props = {
  params: {
    post: string;
    category: string;
  };
};

export async function generateMetadata({
  params: { post, category },
}: Props): Promise<Metadata> {
  const page = await getPost(category, post);

  if (!page) notFound();

  return {
    title: page.title,
    description: page.postMetaDescription,
  };
}

export default async function Post({ params: { post, category } }: Props) {
  const page = await getPost(category, post);

  if (!page) notFound();

  return (
    <div>
      Post title: {page.title} <br />
      Post slug: {page.postSlug} <br />
      Category: {page.category} <br />
      Category slug: {page.categorySlug} <br />
      Author name: {page.authorName} <br />
      Author slug: {page.authorSlug} <br />
      Post content: <PortableText value={page.content} /> <br />
      Post categories: {page.categories.map(category => category + " ")}
    </div>
  );
}
