import Link from "next/link";
import CategoryLabelStyles from "./CategoryLabelStyles";

import { Category } from "@/types/Category";

interface Props {
  categories: Category[];
  nomargin?: boolean;
}

export default function CategoryLabel({ categories, nomargin = false }: Props) {
  return (
    <div className="flex gap-3">
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
