import { getPostHeadings } from "@/sanity/client";
import { Headings } from "@/types/Headings";

import speakingurl from "speakingurl";

interface Props {
  postSlug: string;
  categorySlug: string;
}

export default async function TableOfContents({
  postSlug,
  categorySlug,
}: Props) {
  const headingsData: Promise<Headings> = getPostHeadings(
    categorySlug,
    postSlug
  );

  const headings = (await headingsData).headings;

  return (
    <div>
      <h1>Table of Contents</h1>
      <ul>
        {headings.map((heading, index) => (
          <li key={index}>
            <a href={`#${speakingurl(heading.children[0].text)}`}>
              {heading.children[0].text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
