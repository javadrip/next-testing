"use client";

import { useParams } from "next/navigation";

import { getPostHeadings } from "@/sanity/client";
import { Headings } from "@/types/Headings";

import speakingurl from "speakingurl";

// interface Props {
//   postSlug: string;
//   categorySlug: string;
// }

export default async function TableOfContents() {
  const params = useParams();

  const { postSlug, categorySlug } = params;

  const headingsData: Promise<Headings> = getPostHeadings(
    categorySlug,
    postSlug
  );

  const headings = (await headingsData).headings;

  // Smooth scroll to heading
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
          {headings.map((heading, index) => {
            const text = heading.children[0].text;
            const id = speakingurl(text);

            return (
              <li key={index}>
                <a
                  href={`#${id}`}
                  onClick={e => {
                    e.preventDefault();
                    scrollToHeading(id);
                  }}
                >
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
