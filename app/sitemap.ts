import {
  getAllPostSlugs,
  getAllCategories,
  getAllAuthorSlugs,
} from "@/sanity/sanity-utils";
import { MetadataRoute } from "next";
// import {useEffect, useState} from "react"

// Remember to keep robots.txt up to date
const URL = "https://next-testing-fawn.vercel.app";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  // const [postsData, setPostsData] = useState([])
  // const [categoriesData, setCategoriesData] = useState([])
  // const [authorsData, setAuthorsData] = useState([])

  // useEffect(() => {
  //   // fetch data for posts <Async>: returns promise
  //   getAllPostSlugs()
  //   // resolve the promise with .then()
  //   .then((data) => {
  //     // map through each of the entries and create the sitemap data
  //     const posts = data.map(route => ({
  //       url: `${URL}/${route.categorySlug}/${route.postSlug}`,
  //       lastModified: new Date().toISOString(),
  //     }));
  //     // set the state with the formatted results
  //     setPostsData(posts)}
  //   )
  //   // same thing for categories
  //   getAllCategories().then(data => setCategoriesData(data));
  //   // same thing for authors
  //   getAllAuthorSlugs().then(data => setAuthorsData(data));
  // }, [])

  const postsData = await getAllPostSlugs();
  const categoriesData = await getAllCategories();
  const authorsData = await getAllAuthorSlugs();

  const posts = postsData.map(route => ({
    url: `${URL}/${route.categorySlug}/${route.postSlug}`,
    lastModified: new Date().toISOString(),
  }));

  const categories = categoriesData.map(route => ({
    url: `${URL}/${route.slug.current}`,
    lastModified: new Date().toISOString(),
  }));

  const authors = authorsData.map(route => ({
    url: `${URL}/authors/${route.slug.current}`,
    lastModified: new Date().toISOString(),
  }));

  // return [...postsData, ...categoriesData, ...authorsData];
  return [...posts, ...categories, ...authors];
}
