import { notFound } from "next/navigation";
import { PortableText } from "@/sanity/plugins/portabletext";

import { getPost } from "@/sanity/sanity-utils";
import Container from "@/app/components/container";

import { Post } from "@/types/Post";

type Props = {
  params: {
    postSlug: string;
    categorySlug: string;
  };
};

export default async function Post({
  params: { postSlug, categorySlug },
}: Props) {
  const page = await getPost(categorySlug, postSlug);

  if (!page) notFound();

  return (
    <Container>
      Post title: {page.title} <br />
      Post slug: {page.postSlug} <br />
      Category: {page.categories[0].title} <br />
      Category slug: {page.categorySlug} <br />
      Author name: {page.author.name} <br />
      Author slug: {page.author.slug.current} <br />
      Post content: <PortableText value={page.body} /> <br />
      Post categories: {page.categories.map(category => category.title + " ")}
    </Container>
  );
}

// Enables statically generating routes at build time instead of on-demand at request time
// generateStaticParams can be placed in the page.tsx at the last route segment.
