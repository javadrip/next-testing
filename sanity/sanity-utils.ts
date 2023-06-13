import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { Post } from "../types/Post";
import { Author } from "../types/Author";
import { Category } from "../types/Category";

// Get a single post
export async function getPost(
  categorySlug: string,
  postSlug: string
): Promise<Post> {
  // clientConfig is imported from sanity/config/client-config.ts
  return createClient(clientConfig).fetch(
    // * grabs everything in the dataset
    // [] filters down the data
    // {} specifies the projection aka the data we want to see
    // The query still returns an array, so we need to grab the first element, hence the [0]
    groq`*[_type == "post" && postSlug.current == $postSlug && $categorySlug in categories[]->categorySlug.current][0]{
      _id,
      _createdAt,
      _updatedAt,
      title,
      "postMetaDescription": postMetaDescription,
      "postSlug": postSlug.current,
      "categorySlug": $categorySlug,
      "authorName": author->name,
      "authorSlug": author->authorSlug.current,
      "mainImage": mainImage.asset->url,
      "categories": categories[]->category,
      "category": *[_type == "category" && categorySlug.current == $categorySlug][0].category,
      content
    }`,
    // Short hand for { slug: slug } and { category: category }
    // slug and category values are taken from the getPost parameter slug
    // Both slug and category are passed as variables
    { categorySlug, postSlug }
  );
}

// Get a single category
export async function getCategory(categorySlug: string): Promise<Category> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "category" && categorySlug.current == $categorySlug][0]{
      _id,
      _createdAt,
      category,
      "categorySlug": categorySlug.current,
      description,
    }`,
    { categorySlug }
  );
}

// Get all categories
export async function getAllCategories(): Promise<Category[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "category"]{
      _id,
      _createdAt,
      category,
      "categorySlug": categorySlug.current,
      description,
    }`
  );
}

// Get all posts in a single category
export async function getCategoryPosts(categorySlug: string): Promise<Post[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "post" && $categorySlug in categories[]->categorySlug.current]{
      _id,
      _createdAt,
      _updatedAt,
      title,
      "postSlug": postSlug.current,
      "categorySlug": $categorySlug,
      "mainImage": mainImage.asset->url,
      "category": *[_type == "category" && categorySlug.current == $categorySlug][0].category,
    }`,
    { categorySlug }
  );
}

// Get data of a single author
export async function getAuthor(authorSlug: string): Promise<Author> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "author" && authorSlug.current == $authorSlug][0]{
      _id,
      _createdAt,
      name,
      "authorSlug": authorSlug.current,
      "image": image.asset->url,
      bio,
    }`,
    { authorSlug }
  );
}

// Get all posts by a single author
export async function getAuthorPosts(authorSlug: string): Promise<Post[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "post" && references(*[_type == "author" && authorSlug.current == $authorSlug][0]._id)]{
      _id,
      _createdAt,
      _updatedAt,
      title,
      "postSlug": postSlug.current,
      "categorySlug": categories[0]->categorySlug.current,
      "mainImage": mainImage.asset->url,
      "category": categories[0]->category,
    }`,
    { authorSlug }
  );
}

// This function returns information about an author and all of their posts in one GROQ query
// export async function getAuthor(authorSlug: string): Promise<Author> {
//   return createClient(clientConfig).fetch(
//     groq`*[_type == "author" && authorSlug.current == $authorSlug][0]{
//       _id,
//       _createdAt,
//       name,
//       "authorSlug": authorSlug.current,
//       "image": image.asset->url,
//       bio,
//       "posts": *[_type == "post" && references(^._id)]{
//         _id,
//         _createdAt,
//         title,
//         "postSlug": postSlug.current,
//         "categorySlug": categories[0]->categorySlug.current,
//         "mainImage": mainImage.asset->url,
//         "category": *[_type == "category" && categorySlug.current == categories[0]->categorySlug.current][0].category,
//         publishedAt,
//       }
//     }`,
//     { authorSlug }
//   );
// }
