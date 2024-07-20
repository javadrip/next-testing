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

  const hotspotX = source?.hotspot?.x || 0.5;
  const hotspotY = source?.hotspot?.y || 0.5;

  const [width, height]: number[] = dimensions
    .split("x")
    .map((num: string) => parseInt(num, 10));

  const url = builder
    .image(source)
    .auto("format")
    .width(source?.hotspot?.width)
    .height(source?.hotspot?.height)
    // .crop, .width, .height and .focalpoint is required for hotspot to work
    .crop("focalpoint")
    .focalPoint(hotspotX, hotspotY)
    .fit("crop")
    .url();

  return {
    src: url,
    width: width,
    height: height,
  };
};
