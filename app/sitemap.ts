import {
  getAllPostSlugs,
  getAllCategories,
  getAllAuthorSlugs,
} from "@/sanity/sanity-utils";
import { MetadataRoute } from "next";

// Remember to keep robots.txt up to date
const URL = "https://next-testing-fawn.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsData = await getAllPostSlugs();
  const categoriesData = await getAllCategories();
  const authorsData = await getAllAuthorSlugs();

  const posts = postsData.map(route => ({
    url: `${URL}/${route.categorySlug}/${route.postSlug}`,
    lastModified: new Date().toISOString(),
  }));

  const categories = categoriesData.map(route => ({
    url: `${URL}/${route.categorySlug}`,
    lastModified: new Date().toISOString(),
  }));

  const authors = authorsData.map(route => ({
    url: `${URL}/authors/${route.authorSlug}`,
    lastModified: new Date().toISOString(),
  }));

  return [...posts, ...categories, ...authors];
}
