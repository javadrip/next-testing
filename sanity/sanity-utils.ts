import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { Post } from "../types/Post";

export async function getPost(category: string, post: string): Promise<Post> {
  // clientConfig is imported from sanity/config/client-config.ts
  return createClient(clientConfig).fetch(
    // * grabs everything in the dataset
    // [] filters down the data
    // {} specifies the projection aka the data we want to see
    // The query still returns an array, so we need to grab the first element, hence the [0]
    groq`*[_type == "post" && postSlug.current == $post && $category in categories[]->categorySlug.current][0]{
      _id,
      _createdAt,
      title,
      "postSlug": postSlug.current,
      "categorySlug": $category,
      "authorName": author->name,
      "authorSlug": author->authorSlug.current,
      "mainImage": mainImage.asset->url,
      "categories": categories[]->category,
      "category": *[_type == "category" && categorySlug.current == $category][0].category,
      publishedAt,
      content
    }`,
    // Short hand for { slug: slug } and { category: category }
    // slug and category values are taken from the getPost parameter slug
    // Both slug and category are passed as variables
    { post, category }
  );
}
