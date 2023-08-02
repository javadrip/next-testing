import { getCategoryTitleBySlug } from "@/sanity/client";

type Props = {
  categorySlug: string;
};

export default async function CategoryPageBanner({ categorySlug }: Props) {
  const categoryTitle = await getCategoryTitleBySlug(categorySlug);

  return (
    <>
      <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        {categoryTitle}
      </h1>
      <div className="text-center">
        <p className="mt-2 text-lg">See all posts we have ever written.</p>
      </div>
    </>
  );
}
