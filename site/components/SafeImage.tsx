"use client";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  hideParentOnError?: boolean;
}

export default function SafeImage({ src, alt, className, loading = "lazy", hideParentOnError }: SafeImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={(e) => {
        const el = e.target as HTMLImageElement;
        if (hideParentOnError && el.parentElement) {
          el.parentElement.style.display = "none";
        } else {
          el.style.display = "none";
        }
      }}
    />
  );
}
