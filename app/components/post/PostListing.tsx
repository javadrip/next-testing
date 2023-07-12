import type { Post } from "@/types/Post";

type Props = {
  post: Post;
};

export default function PostListing({ post }: Props) {
  return (
    <>
      <h2>Post title: {post.title}</h2>
      Post slug: {post.slug.current} <br />
      Category: {post.categories[0].title} <br />
      Category slug: {post.categorySlug} <br />
      Date posted: {post._createdAt.toString()} <br />
      <br />
    </>
  );
}
