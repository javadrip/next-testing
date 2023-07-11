import React from "react";
import Iframe from "react-iframe";

import { PreviewProps } from "sanity";

type Props = PreviewProps & {
  url?: string;
  height?: string;
};

const IframePreview = (props: Props): JSX.Element => {
  const { url, height } = props;

  if (!url) {
    return <p>Missing Embed URL</p>;
  }

  return (
    <Iframe
      url={url}
      width="100%"
      height={height || "350"}
      styles={{
        ...(!height && { aspectRatio: "16 / 9" })
      }}
      display="block"
      position="relative"
      frameBorder={0}
      allowFullScreen
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
    />
  );
};

export default IframePreview;
