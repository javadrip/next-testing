import { Post } from "./Post";
import { PortableTextBlock } from "sanity";

export type Author = {
  // All properties with an underscore are generated automatically by Sanity
  _id: string;
  _createdAt: Date;

  // The rest of the properties are defined in the schema by us
  name: string;
  authorSlug: string;
  image: string;
  alt: string;
  bio: PortableTextBlock[];
  posts: Post[];
};
