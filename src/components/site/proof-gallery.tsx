import Image from "next/image";

import { jobImages } from "@/lib/site-data";

type ProofGalleryProps = {
  limit?: number;
  compact?: boolean;
};

export function ProofGallery({ limit, compact = false }: ProofGalleryProps) {
  const items = typeof limit === "number" ? jobImages.slice(0, limit) : jobImages;

  return (
    <div className={compact ? "proof-grid proof-grid-compact" : "proof-grid"}>
      {items.map((image, index) => (
        <figure className="proof-tile reveal" key={image.src}>
          <div className="proof-image-wrap">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={compact ? "(max-width: 768px) 50vw, 25vw" : "(max-width: 768px) 100vw, 33vw"}
              className="proof-image"
            />
          </div>
          <figcaption>
            <span>{image.stage}</span>
            {image.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
