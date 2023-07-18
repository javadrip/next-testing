import Link from "next/link";
import Image from "next/image";

import { PortableText } from "@/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/urlFor";

import { Author } from "@/types/Author";

export default function AuthorCard({ author }: { author: Author }) {
  const imageProps = author?.image ? urlForImage(author.image) : null;
  return (
    <div className="mt-3 rounded-2xl bg-gray-50 px-8 py-8 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
      <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
        <div className="relative mt-1 h-24 w-24 flex-shrink-0 ">
          {imageProps && (
            <Link href={`/author/${author.slug.current}`}>
              <Image
                src={imageProps.src}
                alt={author.name}
                className="rounded-full object-cover"
                fill
                sizes="96px"
              />
            </Link>
          )}
        </div>
        <div>
          <div className="mb-3">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
              About {author.name}
            </h3>
          </div>
          <div>{author.bio && <PortableText value={author.bio} />}</div>
          <div className="mt-3">
            <Link
              href={`/author/${author.slug.current}`}
              className="bg-brand-secondary/20 rounded-full py-2 text-sm text-blue-600 dark:text-blue-500 "
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
