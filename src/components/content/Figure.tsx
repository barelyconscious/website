interface FigureProps {
  src: string;
  caption?: string;
  alt?: string;
  /** Render pixel-art crisp (default true for game screenshots). */
  pixelated?: boolean;
  /** Constrain width, e.g. "max-w-sm". */
  className?: string;
}

const Figure = ({ src, caption, alt, pixelated = true, className }: FigureProps) => {
  return (
    <figure className={`my-8 ${className ?? ""}`}>
      <img
        src={src}
        alt={alt ?? caption ?? ""}
        className={`mx-auto w-full border-2 border-black pixel-shadow ${
          pixelated ? "pixelated" : ""
        }`}
      />
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default Figure;
