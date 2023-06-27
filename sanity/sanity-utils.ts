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

// Get slugs of all posts
export async function getAllPostSlugs(): Promise<Post[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "post"]{
      "postSlug": postSlug.current,
      "categorySlug": categories[0]->categorySlug.current,
    }`
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

// Get the next 10 posts in a single category
// TODO: Refine for pagination in app/[categorySlug]/page.tsx
let lastPublishedAt = "";
let lastId: string | null = "";

export async function getNextTenPosts(categorySlug: string): Promise<Post[]> {
  if (lastId === null) {
    return [];
  }

  const query = groq`*[_type == "post" && (
    _updatedAt > $lastPublishedAt
    || (_updatedAt == $lastPublishedAt && _id > $lastId)
  ) && $categorySlug in categories[]->categorySlug.current]
  | order(_updatedAt)
  [0...2]{
    _id,
    _createdAt,
    _updatedAt,
    title,
    "postSlug": postSlug.current,
    "categorySlug": $categorySlug,
    "mainImage": mainImage.asset->url,
    "category": *[_type == "category" && categorySlug.current == $categorySlug][0].category
  }`;

  const params = {
    lastPublishedAt,
    lastId,
    categorySlug,
  };

  const result = await createClient(clientConfig).fetch(query, params);

  if (result.length > 0) {
    lastPublishedAt = result[result.length - 1]._updatedAt;
    lastId = result[result.length - 1]._id;
  } else {
    lastId = null; // Reached the end
  }

  console.log(result);

  return result;
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

// Get slugs of all authors
export async function getAllAuthorSlugs(): Promise<Author[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "author"]{
      "authorSlug": authorSlug.current,
    }`
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
