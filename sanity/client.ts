import { createClient } from "next-sanity";

import config from "./client-config";

import {
  getAll,
  configQuery,
  singlepostquery,
  tldrquery,
  postsquery,
  pathquery,
  paginatedpostsquery,
  postheadingsquery,
  allauthorsquery,
  authorsquery,
  postsbyauthorquery,
  paginatedpostsbyauthorquery,
  catpathquery,
  categorytitlebyslugquery,
  postsbycatquery,
  paginatedpostsbycatquery,
  catquery,
  searchquery,
  limitquery,
} from "./groq";

import { Post } from "@/types/Post";
import { Category } from "@/types/Category";
import { Author } from "@/types/Author";

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = createClient(config);

export const fetcher = async ([query, params]: [string, object]) => {
  return client ? client.fetch(query, params) : [];
};

(async () => {
  if (client) {
    const data = await client.fetch(getAll);
    if (!data || !data.length) {
      console.error(
        "Sanity returns empty array. Are you sure the dataset is public?"
      );
    }
  }
})();

export async function getSettings() {
  if (client) {
    return (await client.fetch(configQuery)) || [];
  }
  return [];
}

// ==================================== POST ==================================== //

// UPDATED AND FUNCTIONAL
export async function getPostBySlug(
  categorySlug: string,
  postSlug: string
): Promise<Post> {
  if (client) {
    return (
      (await client.fetch(singlepostquery, { categorySlug, postSlug })) || {}
    );
  }
  return <Post>{};
}

export async function getPostTldr(
  categorySlug: string,
  postSlug: string
): Promise<Post> {
  if (client) {
    return (await client.fetch(tldrquery, { categorySlug, postSlug })) || {};
  }
  return <Post>{};
}

export async function getPostHeadings(categorySlug: string, postSlug: string) {
  if (client) {
    return (
      (await client.fetch(postheadingsquery, { categorySlug, postSlug })) || {}
    );
  }
  return [];
}

export async function getAllPosts(): Promise<Post[]> {
  if (client) {
    return (await client.fetch(postsquery)) || [];
  }
  return [];
}

export async function getAllPostsSlugs(): Promise<{ slug: string }[]> {
  if (client) {
    const slugs: string[] = (await client.fetch(pathquery)) || [];
    return slugs.map(slug => ({ slug }));
  }
  return [];
}

// Currently not in use, possibly to be used in archive
export async function getPaginatedPosts(limit: number) {
  if (client) {
    return (
      (await client.fetch(paginatedpostsquery, {
        pageIndex: 0,
        limit: limit,
      })) || {}
    );
  }
  return {};
}

// ==================================== AUTHOR ==================================== //

export async function getAllAuthors() {
  if (client) {
    return (await client.fetch(allauthorsquery)) || [];
  }
  return [];
}

export async function getAllAuthorsSlugs() {
  if (client) {
    const slugs: string[] = (await client.fetch(authorsquery)) || [];
    return slugs.map(slug => ({ author: slug }));
  }
  return [];
}

// Get all posts by a single author
export async function getAuthorPostsBySlug(slug: string) {
  if (client) {
    return (await client.fetch(postsbyauthorquery, { slug })) || {};
  }
  return {};
}

export async function getPaginatedAuthorPostsBySlug(
  authorSlug: string,
  limit: number
) {
  if (client) {
    return (
      (await client.fetch(paginatedpostsbyauthorquery, {
        authorSlug,
        pageIndex: 0,
        limit: limit,
      })) || {}
    );
  }
  return {};
}

// ==================================== CATEGORY ==================================== //

export async function getAllCategories() {
  if (client) {
    const slugs: string[] = (await client.fetch(catpathquery)) || [];
    return slugs.map(slug => ({ category: slug }));
  }
  return [];
}

export async function getCategoryTitleBySlug(categorySlug: string) {
  if (client) {
    return (
      (await client.fetch(categorytitlebyslugquery, { categorySlug })) || {}
    );
  }
  return {};
}

export async function getPostsByCategory(
  categorySlug: string
): Promise<Post[]> {
  if (client) {
    return await client.fetch<Post[]>(postsbycatquery, {
      categorySlug,
    });
  }
  return [];
}

export async function getPaginatedPostsByCategory(
  categorySlug: string,
  limit: number
) {
  if (client) {
    return (
      (await client.fetch(paginatedpostsbycatquery, {
        categorySlug,
        pageIndex: 0,
        limit: limit,
      })) || {}
    );
  }
  return {};
}

export async function getTopCategories() {
  if (client) {
    return (await client.fetch(postsbycatquery)) || [];
  }
  return [];
}
