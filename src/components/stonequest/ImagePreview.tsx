interface ImagePreviewProps {
  image: string;
  description: string;
  antialias?: boolean;
  width?: number | string;
}

const ImagePreview = ({ image, description, antialias = true, width = "auto" }: ImagePreviewProps) => {
  return (
    <img
      width={width}
      className="block max-w-full mx-auto"
      style={{ imageRendering: antialias ? "auto" : "pixelated" }}
      src={image}
      alt={description}
    />
  );
};

export default ImagePreview;
