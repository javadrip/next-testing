import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

import { getAuthor } from "@/sanity/sanity-utils";
import { urlForImage } from "@/lib/urlFor";

import type { Author } from "@/types/Author";

type Props = {
  authorSlug: string;
};

export default async function AuthorProfile({ authorSlug }: Props) {
  const authorData: Promise<Author> = getAuthor(authorSlug);

  const author = await authorData;

  if (!author) notFound();

  const imageProps = author?.image ? urlForImage(author.image) : null;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-20 w-20 overflow-hidden rounded-full">
        {imageProps && (
          <Image
            src={imageProps.src}
            alt={author.name}
            className="rounded-full object-cover"
            fill
            sizes="96px"
          />
        )}
      </div>
      <h1 className="text-brand-primary mt-2 text-3xl font-semibold tracking-tight dark:text-white lg:text-3xl lg:leading-tight">
        {author.name}
      </h1>
      <div className="mx-auto mt-2 flex max-w-xl flex-col px-5 text-center text-gray-500">
        <PortableText value={author.bio} />
      </div>
    </div>
  );
}
