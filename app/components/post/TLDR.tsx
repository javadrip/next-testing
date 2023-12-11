import { getPostTldr } from "@/sanity/client";
import { PortableText } from "@/sanity/plugins/portabletext";

type Props = {
  postSlug: string;
  categorySlug: string;
};

export default async function TLDR({ postSlug, categorySlug }: Props) {
  const tldrData = await getPostTldr(categorySlug, postSlug);

  return (
    // prose is a class from tailwindcss https://tailwindcss.com/docs/typography-plugin
    // prose is required for PortableText to render properly
    <div className="prose mx-auto my-4 dark:prose-invert prose-a:text-blue-600 border-4 p-2 rounded-lg">
      <div>
        <p className="text-brand-primary text-2xl font-semibold tracking-tight mt-2 ml-2 mb-2">
          TL;DR
        </p>
      </div>
      {tldrData.tldr && <PortableText value={tldrData.tldr} />}
    </div>
  );
}
