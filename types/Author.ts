import { Post } from "./Post";
import { PortableTextBlock } from "sanity";

export type Author = {
  // All properties with an underscore are generated automatically by Sanity
  _id: string;
  _createdAt: string;

  // The rest of the properties are defined in the schema by us
  name: string;
  slug: {
    current: string;
  };
  image: string;
  bio: PortableTextBlock[];
  posts: Post[];
};
