import { PortableTextBlock, Image } from "sanity";
import { Category } from "./Category";
import { Author } from "./Author";

export type Post = {
  // All properties with an underscore are generated automatically by Sanity
  _id: string;
  _createdAt: string;

  // The rest of the properties are defined in the schema by us
  title: string;
  slug: {
    current: string;
  };
  postSlug: string;
  categorySlug: string;
  excerpt: string;
  author: Author;
  mainImage: Image & {
    alt: string; // Add the alt property to the mainImage type
  };
  categories: Category[];
  publishedAt: string;
  featured: boolean;
  estReadingTime: number;

  // PortableTextBlock[] is how Sanity stores rich content
  body: PortableTextBlock[];
};
