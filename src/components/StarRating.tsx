import { Star } from "lucide-react";
import clsx from "clsx";

interface StarRatingProps {
  rating: number;
  max?: number;
}

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={clsx(
            i < rating ? "fill-celestial-gold text-celestial-gold" : "fill-transparent text-muted-violet/40",
          )}
        />
      ))}
    </div>
  );
}
