import { getPost } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";

type Props = {
  params: {
    post: string;
    category: string;
  };
};

export default async function Post({ params }: Props) {
  const post = params.post;
  const category = params.category;
  // const categorySlug = category + "/" + slug;
  const page = await getPost(category, post);

  console.log(page.categorySlug);

  return (
    <div>
      Post title: {page.title} <br />
      Post slug: {page.postSlug} <br />
      Category: {page.category} <br />
      Category slug: {page.categorySlug} <br />
      Post content: <PortableText value={page.content} /> <br />
      Post categories: {page.categories.map(category => category + " ")}
    </div>
  );
}
