import type { Post } from "@/types/Post";

type Props = {
  promise: Promise<Post[]>;
};

export default async function CategoryPosts({ promise }: Props) {
  const posts = await promise;

  const content = posts.map(post => (
    <article key={post._id}>
      <h2>Post title: {post.title}</h2>
      <br />
      Post slug: {post.postSlug} <br />
      Category: {post.category} <br />
      Category slug: {post.categorySlug} <br />
      Date posted: {post._createdAt.toString()} <br />
      <br />
    </article>
  ));

  return content;
}
