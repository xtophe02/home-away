import { FaStar } from "react-icons/fa";

export async function PropertyRating({
  propertyId,
  inPage,
}: {
  propertyId: string;
  inPage: boolean;
}) {
  // temp
  const rating = 4.7;
  const count = 100;
  void propertyId;

  const className = `flex gap-1 items-center ${inPage ? "text-md" : "text-xs"}`;
  const countText = count > 1 ? "reviews" : "review";
  const countValue = `(${count}) ${inPage ? countText : ""}`;
  return (
    <span className={className}>
      <FaStar className="w-3 h-3 text-yellow-500" />
      {rating} {countValue}
    </span>
  );
}
