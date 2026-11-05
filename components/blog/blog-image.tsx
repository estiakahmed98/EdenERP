import Image from "next/image";
import { FileText } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Admin-uploaded images may live on any host: optimize local files and
 * Unsplash (allowed in next.config), load other remote hosts as-is.
 */
export default function BlogImage({
  src,
  alt,
  sizes,
  priority,
  className,
}: {
  src?: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!src)
    return (
      <div
        className={cn(
          "flex size-full items-center justify-center bg-linear-to-br from-primary/15 to-secondary/20 text-primary/50",
          className,
        )}
      >
        <FileText className="size-10" aria-hidden="true" />
      </div>
    );

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={
        /^https?:\/\//.test(src) && !src.startsWith("https://images.unsplash.com/")
      }
      className={cn("object-cover", className)}
    />
  );
}
