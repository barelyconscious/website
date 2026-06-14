import type { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  /** Optional background image (rendered behind a dark gradient). */
  image?: string;
  /** Render pixel-art backgrounds crisp. */
  pixelated?: boolean;
  children?: ReactNode;
}

const PageHero = ({ title, subtitle, image, pixelated, children }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden border-b-2 border-black scanlines">
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt=""
            className={`size-full object-cover opacity-40 ${pixelated ? "pixelated" : ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
      )}
      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <h1 className="text-2xl leading-tight text-foreground sm:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
};

export default PageHero;
