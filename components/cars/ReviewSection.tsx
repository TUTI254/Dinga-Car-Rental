"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Star, Trash2, Edit3 } from "lucide-react";
import { Review } from "@/types";
import { getVehicleReviews, addReview, deleteReview } from "@/lib/booking-store";
import toast from "react-hot-toast";
import { format } from "date-fns";

export default function ReviewSection({ vehicleId }: { vehicleId: string }) {
  const { user, isSignedIn } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = () => setReviews(getVehicleReviews(vehicleId));
  useEffect(load, [vehicleId]);

  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn || !user) return;
    setSubmitting(true);
    try {
      addReview({
        vehicleId,
        userId: user.id,
        userName: user.fullName || user.primaryEmailAddress?.emailAddress || "Anonymous",
        userImage: user.imageUrl,
        rating,
        comment,
      });
      setComment("");
      setRating(5);
      load();
      toast.success("Review submitted!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!user) return;
    deleteReview(id, user.id);
    load();
    toast.success("Review deleted");
  };

  return (
    <div className="mt-10">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-black-100">Reviews</h2>
          <p className="text-grey text-sm">{reviews.length} customer review{reviews.length !== 1 ? "s" : ""}</p>
        </div>
        {reviews.length > 0 && (
          <div className="ml-auto flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-2xl">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-2xl font-extrabold text-black-100">{avgRating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Write a review */}
      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-5 mb-8">
          <h3 className="font-bold text-black-100 mb-4">Write a Review</h3>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((r) => (
              <button key={r} type="button" onClick={() => setRating(r)}>
                <Star className={`w-6 h-6 transition-colors ${r <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
              </button>
            ))}
            <span className="text-grey text-sm ml-2">{rating} / 5</span>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this vehicle..."
            rows={3}
            required
            minLength={20}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
          <button
            type="submit"
            disabled={submitting || comment.length < 20}
            className="mt-3 bg-primary-blue text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-blue/90 disabled:opacity-50 transition-colors"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-center text-grey text-sm">
          <a href="/sign-in" className="text-primary-blue font-semibold hover:underline">Sign in</a> to leave a review.
        </div>
      )}

      {/* Review list */}
      {reviews.length === 0 ? (
        <p className="text-grey text-sm">No reviews yet. Be the first!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  {r.userImage ? <img src={r.userImage} alt={r.userName} className="w-9 h-9 rounded-full" /> : <div className="w-9 h-9 rounded-full bg-primary-blue flex items-center justify-center text-white text-sm font-bold">{r.userName[0]}</div>}
                  <div>
                    <p className="font-bold text-black-100 text-sm">{r.userName}</p>
                    <p className="text-xs text-grey">{format(new Date(r.createdAt), "MMM d, yyyy")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />)}
                  </div>
                  {user?.id === r.userId && (
                    <button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-600 ml-2">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-grey text-sm leading-relaxed">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
