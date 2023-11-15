import { getPost } from "@/sanity/sanity-utils";

type Props = {
  params: {
    postSlug: string;
    categorySlug: string;
  };
};

export default async function ImageTest({
  params: { postSlug, categorySlug },
}: Props) {
  const post = await getPost(
    (categorySlug = "personal-growth"),
    (postSlug = "10-simple-practices-that-will-help-you-get-1-better-every-day")
  );
}
