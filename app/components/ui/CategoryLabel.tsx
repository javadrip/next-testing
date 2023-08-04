import Link from "next/link";
import clsx from "clsx";

import CategoryLabelStyles from "./CategoryLabelStyles";

import { Category } from "@/types/Category";

interface Props {
  categories: Category[];
  nomargin?: boolean;
  hideCategoryLabel?: boolean;
}

export default function CategoryLabel({
  categories,
  nomargin = false,
  hideCategoryLabel,
}: Props) {
  return (
    <div className={clsx("flex gap-3", hideCategoryLabel && "hidden")}>
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link href={`/${category.slug.current}`} key={index}>
            <CategoryLabelStyles nomargin={nomargin} color={category.color}>
              {category.title}
            </CategoryLabelStyles>
          </Link>
        ))}
    </div>
  );
}
