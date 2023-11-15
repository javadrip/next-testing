import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import config from "../sanity/client-config";

type ImageData = {
  src: string;
  width: number;
  height: number;
};

const client = createClient(config);

const builder = imageUrlBuilder(client);

// TODO: Give source a type
export const urlForImage = (source: any): ImageData | undefined => {
  if (!source || !source.asset) return;

  const dimensions = source?.asset?._ref.split("-")[2];

  const [width, height]: number[] = dimensions
    .split("x")
    .map((num: string) => parseInt(num, 10));

  const url = builder
    .image(source)
    .auto("format")
    .width(Math.min(width, 2000))
    // Adding hotspot info did not work. Also broke other images.
    // .focalPoint(source?.hotspot?.x, source?.hotspot?.y)
    .url();

  return {
    src: url,
    width: width,
    height: height,
  };
};
