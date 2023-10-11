"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { getPostHeadings } from "@/sanity/client";
import { Headings, Heading } from "@/types/Headings";

import speakingurl from "speakingurl";

export default function TableOfContents() {
  const params = useParams();

  const { postSlug, categorySlug } = params;

  const [headings, setHeadings] = useState<Heading[]>();

  useEffect(() => {
    const getHeadings = async () => {
      let headingsData: Promise<Headings> = await getPostHeadings(
        categorySlug,
        postSlug
      );

      const data = await headingsData;
      setHeadings(data?.headings);
    };
    getHeadings();
    // Empty dependency array ensures that effect is only run on mount
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Smooth scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // const handleClick = (e: any) => {
  //   const id = speakingurl(e.target.textContent);
  //   scrollToHeading(id);
  // };

  return (
    // div is necessary for the sticky to work
    <div>
      {/* div that only appears when the post appears and sticks to the side of the post */}
      <div className="hidden xl:block sticky top-20 max-w-fit mx-auto mt-4">
        <h1>Table of Contents</h1>
        <ul>
          {headings?.map((heading, index) => {
            const text = heading.children[0].text;
            const id = speakingurl(text);

            return (
              <li
                key={index}
                // onClick={handleClick}
              >
                <Link
                  href={`#${id}`}
                  onClick={e => {
                    e.preventDefault();
                    scrollToHeading(id);
                  }}
                >
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
