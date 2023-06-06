import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { Post } from "../types/Post";

export async function getPost(slug: string): Promise<Post> {
  // clientConfig is imported from sanity/config/client-config.ts
  return createClient(clientConfig).fetch(
    // * grabs everything in the dataset
    // [] filters down the data
    // {} specifies the projection aka the data we want to see
    // The query still returns an array, so we need to grab the first element, hence the [0]
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      "author": author->username,
      "mainImage": mainImage.asset->url,
      "categories": categories[]->title,
      // category,
      publishedAt,
      body
    }`,
    // Short hand for { slug: slug }
    // slug value is taken from the getPost parameter slug
    { slug }
  );
}
