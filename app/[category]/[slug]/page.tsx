import { getPost } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";

type Props = {
  params: {
    slug: string;
    category: string;
  };
};

export default async function Post({ params }: Props) {
  const slug = params.slug;
  const category = params.category;
  // const categorySlug = category + "/" + slug;
  const page = await getPost(category, slug);

  return (
    <div>
      Post with category: {category} <br />
      Post slug: {page.slug} <br />
      Post title: {page.title} <br />
      Post content: <PortableText value={page.body} />
    </div>
  );
}
