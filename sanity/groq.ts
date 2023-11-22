import { groq } from "next-sanity";

// ============================== POST QUERIES ============================== //
//UPDATED AND FUCTIONAL
// Get all posts
export const postsquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  mainImage,
  featured,
  excerpt,
  slug,
  title,
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]->,
  "categorySlug": categories[0]->slug.current,
}
`;

// Get the latest 3 featured posts
export const featuredpostsquery = groq`
*[_type == "post" && featured == true] | order(_updatedAt desc, publishedAt desc) [0...3] {
  _id,
  _createdAt,
  publishedAt,
  mainImage,
  featured,
  excerpt,
  slug,
  title,
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]->,
  "categorySlug": categories[0]->slug.current,
}
`;

// Get all posts with 0..limit
export const limitquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [0..$limit] {
  ...,
  author->,
  categories[]->
}
`;

// [(($pageIndex - 1) * 10)...$pageIndex * 10]{
// Get subsequent paginated posts
export const paginatedpostsquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
  ...,
  author->,
  categories[]->,
  "categorySlug": categories[0]->slug.current,
}
`;
export const paginatedpostsbycatquery = groq`
*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
  ...,
  author->,
  categories[]->,
  "categorySlug": categories[0]->slug.current,
}
`;

// UPDATED AND FUNCTIONAL
// Single Post
export const singlepostquery = groq`
*[_type == "post" && slug.current == $postSlug && $categorySlug in categories[]->slug.current][0] {
  ...,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
  author->,
  categories[]->,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...5] {
    title,
    slug,
    "date": coalesce(publishedAt,_createdAt),
    "image": mainImage
  },
}
`;

export const postheadingsquery = groq`
*[_type == "post" && slug.current == $postSlug && $categorySlug in categories[]->slug.current][0] {
  "headings": body[length(style) == 2 && string::startsWith(style, "h")]
}`;

// Get Posts by Authors
export const postsbyauthorquery = groq`
*[_type == "post" && $slug match author->slug.current ] {
  ...,
  author->,
  categories[]->,
  "categorySlug": categories[0]->slug.current,
}
`;

export const paginatedpostsbyauthorquery = groq`
*[_type == "post" && $authorSlug match author->slug.current ] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
  ...,
  author->,
  categories[]->,
  "categorySlug": categories[0]->slug.current,
}
`;

// Get Posts by Category
export const postsbycatquery = groq`
*[_type == "post" && $categorySlug in categories[]->slug.current ] {
  ...,
  author->,
  categories[]->,
  "categorySlug": $categorySlug
}
`;

// ============================== CATEGORY QUERIES ============================== //

export const categorytitlebyslugquery = groq`
*[_type == "category" && slug.current == $categorySlug][0].title
`;

// ============================== SETTINGS QUERIES ============================== //

// Get Site Config
export const configQuery = groq`
*[_type == "settings"][0] {
  ...,
}
`;

// ============================== STATIC QUERIES ============================== //

// Paths for generateStaticParams
export const pathquery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;
export const catpathquery = groq`
*[_type == "category" && defined(slug.current)][].slug.current
`;
export const authorsquery = groq`
*[_type == "author" && defined(slug.current)][].slug.current
`;

// Get top 5 categories
export const catquery = groq`*[_type == "category"] {
  ...,
  "count": count(*[_type == "post" && references(^._id)])
} | order(count desc) [0...5]`;

export const searchquery = groq`*[_type == "post" && _score > 0]
| score(title match $query || excerpt match $query || pt::text(body) match $query)
| order(_score desc)
{
  _score,
  _id,
  _createdAt,
  mainImage,
  author->,
  categories[]->,
   title,
   slug
}`;

// Get all Authors
export const allauthorsquery = groq`
*[_type == "author"] {
 ...,
 'slug': slug.current,
}
`;

// get everything from sanity
// to test connection
export const getAll = groq`*[]`;
