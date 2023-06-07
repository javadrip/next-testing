import { PortableTextBlock } from "sanity";

export type Post = {
  // All properties with an underscore are generated automatically by Sanity
  _id: string;
  _createdAt: Date;

  // The rest of the properties are defined in the schema by us
  title: string;
  postSlug: string;
  categorySlug: string;
  authorName: string;
  authorSlug: string;
  mainImage: string;
  alt: string;
  category: string;
  categories: string[];
  publishedAt: Date;

  // PortableTextBlock[] is how Sanity stores rich content
  content: PortableTextBlock[];
};
