import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating, onRatingChange, readonly = false }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-5 h-5 cursor-pointer transition-colors ${
          star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        } ${readonly ? "cursor-default" : "hover:text-yellow-400"}`}
        onClick={() => !readonly && onRatingChange && onRatingChange(star)}
      />
    ))}
  </div>
);

export default StarRating;
