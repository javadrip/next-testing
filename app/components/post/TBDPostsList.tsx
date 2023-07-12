import type { Post } from "@/types/Post";
import PostListing from "@/app/components/post/PostListing";

type Props = {
  promise: Promise<Post[]>;
};

export default async function PostsList({ promise }: Props) {
  const posts = await promise;

  const content = posts.map(post => (
    <div key={post._id}>
      <PostListing key={post._id} post={post} />
    </div>
  ));

  return content;
}
