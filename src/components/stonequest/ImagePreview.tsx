import React from "react";

interface ImagePreviewProps {
  image: string;
  description: string;
  antialias?: boolean;
  width?: number | string;
}

const InlinePreview: React.FC<ImagePreviewProps> = ({ image, description, antialias = true, width = "auto" }) => {
  return (
    <img
      width={width}
      className="inline-preview"
      style={{ imageRendering: antialias ? "auto" : "pixelated" }}
      src={image}
      alt={description}
    />
  );
};

export default InlinePreview;
