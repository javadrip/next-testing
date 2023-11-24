import { PortableTextBlock, Image } from "sanity";
import { Category } from "./Category";
import { Author } from "./Author";

// QN: Is this the way to do it?
interface ImageWithAlt extends Image {
  alt: string;
}

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
  // QN: Is this the way to do it?
  mainImage: ImageWithAlt;
  categories: Category[];
  publishedAt: string;
  featured: boolean;
  estReadingTime: number;

  // PortableTextBlock[] is how Sanity stores rich content
  body: PortableTextBlock[];
};
