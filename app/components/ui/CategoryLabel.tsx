import Link from "next/link";
import clsx from "clsx";

import CategoryLabelStyles from "./CategoryLabelStyles";

import { Category } from "@/types/Category";

interface Props {
  categories: Category[];
  hideCategoryLabel?: boolean;
}

export default function CategoryLabel({
  categories,
  hideCategoryLabel,
}: Props) {
  return (
    <div className={clsx("flex gap-2", hideCategoryLabel && "hidden")}>
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link href={`/${category.slug.current}`} key={index}>
            <CategoryLabelStyles color={category.color}>
              {category.title}
            </CategoryLabelStyles>
          </Link>
        ))}
    </div>
  );
}
