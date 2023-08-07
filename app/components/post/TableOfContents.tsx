"use client";

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

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    // div is necessary for the sticky to work
    <div>
      {/* div that only appears when the post appears and sticks to the side of the post */}
      <div className="hidden xl:block sticky top-20 max-w-fit mx-auto mt-4">
        <h1>Table of Contents</h1>
        <ul>
          {headings.map((heading, index) => (
            <li key={index}>
              <a
                href={`#${speakingurl(heading.children[0].text)}`}
                onClick={e => {
                  e.preventDefault();
                  scrollToHeading(speakingurl(heading.children[0].text));
                }}
              >
                {heading.children[0].text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
