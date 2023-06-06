import { getPost } from "@/sanity/sanity-utils";

type Props = {
  params: {
    slug: string;
    category: string;
  };
};

export default async function Post({ params }: Props) {
  const slug = params.slug;
  const category = params.category;
  const page = await getPost(slug);

  return (
    <div>
      Post with category: {category} Post slug: {page.slug}
    </div>
  );
}
