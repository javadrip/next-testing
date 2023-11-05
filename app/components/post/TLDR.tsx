import { getPostTldr } from "@/sanity/client";
import { PortableText } from "@/sanity/plugins/portabletext";

type Props = {
  postSlug: string;
  categorySlug: string;
};

export default async function TLDR({ postSlug, categorySlug }: Props) {
  const tldrBlock = await getPostTldr(categorySlug, postSlug);

  console.log(tldrBlock.tldr);

  return (
    // prose is a class from tailwindcss https://tailwindcss.com/docs/typography-plugin
    // prose is required for PortableText to render properly
    <div className="prose mx-auto my-4 dark:prose-invert prose-a:text-blue-600">
      {tldrBlock.tldr && <PortableText value={tldrBlock.tldr} />}
    </div>
  );
}
