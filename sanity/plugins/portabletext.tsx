//Reference: https://github.com/portabletext/react-portabletext
// This file contains custom PortableText components and marks for rendering and displaying rich text content using the Portable Text format.
// In other words, the code sets up the necessary components and configuration to render Portable Text content

import Image from "next/image";
import Link from "next/link";
import { PortableText as PortableTextComponent } from "@portabletext/react";

import Iframe from "react-iframe";
import getVideoId from "get-video-id";
import { clsx } from "clsx";
import speakingurl from "speakingurl";

import { urlForImage } from "@/lib/urlFor";

import Refractor from "react-refractor";
import js from "refractor/lang/javascript";
import jsx from "refractor/lang/jsx";
import html from "refractor/lang/markup";
import css from "refractor/lang/css";
import bash from "refractor/lang/bash";

Refractor.registerLanguage(js);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(html);
Refractor.registerLanguage(css);
Refractor.registerLanguage(bash);

// Barebones lazy-loaded image component
const ImageComponent = ({ value }: any) => {
  // const {width, height} = getImageDimensions(value)

  return (
    <Image
      src={urlForImage(value)!}
      alt={value.alt || "Image"}
      loading="lazy"
      className="object-cover"
      sizes="(max-width: 800px) 100vw, 800px"
    />
  );
};

const PortableTextTable = ({ value }: any) => {
  const [head, ...rows] = value.table.rows;

  return (
    <table>
      {head.cells.filter(Boolean).length > 0 && (
        <thead>
          <tr>
            {head.cells.map((cell: any) => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row: any, index: any) => (
          <tr key={index}>
            {row.cells.map((cell: any, index: any) => {
              return <td key={cell}>{cell}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Code = ({ value }: any) => {
  return (
    <Refractor
      // In this example, `props` is the value of a `code` field
      language={value.language || "bash"}
      value={value.code}
      markers={value.highlightedLines}
    />
  );
};

const IframePreview = ({ value }: any) => {
  const { url, height } = value;
  if (!url) {
    return <p>Missing Embed URL</p>;
  }
  const { id, service } = getVideoId(url);

  const isYoutubeVideo = id && service === "youtube";

  const finalURL = isYoutubeVideo
    ? `https://www.youtube-nocookie.com/embed/${id}`
    : url;

  return (
    <Iframe
      url={finalURL}
      width="100%"
      height={height || "350"}
      className={clsx(!height && "aspect-video", "rounded-md")}
      display="block"
      position="relative"
      frameBorder={0}
      allowFullScreen
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
    />
  );
};

const components = {
  types: {
    image: ImageComponent,
    code: Code,
    embed: IframePreview,
    tables: PortableTextTable,
  },
  block: {
    // Customize block types with ease
    h2: ({ children }: { children: React.ReactNode }) => (
      // Dynamically change the id of h2 tags to match the text
      <h2
        id={children ? speakingurl(children.toString()) : ""}
        className="text-brand-primary text-2xl font-semibold tracking-tight mt-10 mb-3"
      >
        {children}
      </h2>
    ),
  },
  marks: {
    center: (props: any) => <div className="text-center">{props.children}</div>,
    highlight: (props: any) => (
      <span className="font-bold text-blue-500">{props.children}</span>
    ),
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noopener" : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;
      return (
        <a href={value.href} rel={rel} target={target}>
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }: any) => {
      return <Link href={`/post/${value?.slug?.current}`}>{children}</Link>;
    },
  },
};
// Set up Portable Text serialization
export const PortableText = (props: any) => (
  <PortableTextComponent components={components} {...props} />
);
