import { FavoriteToggleButton } from "@/components/card/FavoriteToggleButton";
import { PropertyRating } from "@/components/card/PropertyRating";
import Amenities from "@/components/properties/Amenities";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import Description from "@/components/properties/Description";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import PropertyReviews from "@/components/reviews/PropertyReviews";
import SubmitReview from "@/components/reviews/SubmitReview";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPropertyDetails } from "@/utils/actions";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { findExistingReview } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";

export default async function PropertyDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const DynamicMap = dynamic(
    () => import("@/components/properties/PropertyMap"),
    {
      ssr: false,
      loading: () => <Skeleton className="h-[400px] w-full" />,
    }
  );
  const DynamicBookingWrapper = dynamic(
    () => import("@/components/booking/BookingWrapper"),
    {
      ssr: false,
      loading: () => <Skeleton className="h-[200px] w-full" />,
    }
  );
  const property = await fetchPropertyDetails(params.slug);
  if (!property) redirect("/");
  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };
  const { userId } = auth();
  const isNotOwner = property.profile.clerkId !== userId;
  const reviewDoesNotExist =
    userId && isNotOwner && !(await findExistingReview(userId, property.id));
  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold ">{property.tagline}</h1>
        <div className="flex items-center gap-x-4">
          <ShareButton name={property.name} slug={property.slug} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
      <ImageContainer mainImage={property.image} name={property.name} />
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{property.name}</h1>
            <PropertyRating inPage propertyId={property.id} />
          </div>
          <PropertyDetails details={details} />{" "}
          <UserInfo
            profile={{
              username: property.profile.username,
              profileImage: property.profile.profileImage,
            }}
          />
          <Separator className="mt-4" />
          <Description description={property.description} />
          <Amenities amenities={property.amenities} />
          <DynamicMap countryCode={property.country} />
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          <DynamicBookingWrapper
            propertyId={property.id}
            price={property.price}
            bookings={property.bookings}
          />
        </div>
      </section>
      {reviewDoesNotExist && (
        <SubmitReview propertyId={property.id} slug={property.slug} />
      )}

      <PropertyReviews propertyId={property.id} />
    </section>
  );
}
