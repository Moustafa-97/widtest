/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import axios from "axios";
import styles from "./apartmentDetails.module.css";
import { getLocale, getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { OrbitProgress } from "react-loading-indicators";
import ApartmentPage from "@/Components/00UPDATES/apartmentPage/ApartmentPage";
const Reviews = dynamic(() => import("@/Components/reviews/Reviews"), {
  ssr: false,
  loading: () => (
    <OrbitProgress variant="dotted" dense color={"#47b3c5"} size="large" />
  ),
});
const ReviewModal = dynamic(
  () => import("@/Components/modal/reviewModal/ReviewModal"),
  {
    ssr: false,
  }
);

type Data = {
  id: number;
  title: string;
  data: {
    id: string;
    name: string;
    description: string;
    nightlyPrice: number;
    ApartmentAddress: {
      addressLine: string;
      City: { id: number; name: string };
      District: { id: number; name: string };
      longitude: number;
      latitude: number;
    };
    ApartmentImages: {
      id: string;
      imageUrl: string;
    }[];
    ApartmentDetails: {
      sizeArea: number;
      numberOfBedRooms: number;
      numberOfBeds: number;
      numberOfBathrooms: number;
      numberOfGuests: number | null;
      isFurnished: boolean;
      isPetsAllowed: boolean;
    };
    ApartmentAmenities: {
      hasAirConditioning: boolean;
      hasBalcony: boolean;
      hasCleaningProducts: boolean;
      hasClutery: boolean;
      hasCoffeeMaker: boolean;
      hasDishwasher: boolean;
      hasDryer: boolean;
      hasEVCharger: boolean;
      hasElevator: boolean;
      hasEssentials: boolean;
      hasFreeParking: boolean;
      hasFridge: boolean;
      hasHairDryer: boolean;
      hasHeating: boolean;
      hasIron: boolean;
      hasKitchen: boolean;
      hasOven: boolean;
      hasShampoo: boolean;
      hasTv: boolean;
      hasWashingMachine: boolean;
      hasWheelchairAccess: boolean;
      hasWifi: boolean;
    };
    avgRating: number;
    reviewCount: number;
    isWished: boolean;
  };
};

export default async function ApartmentPageId({
  params: { id },
  searchParams: { start_date, end_date, city, district },
}: any) {
  const t = getTranslations("ApartmentReviews");

  const locale: "en" | "ar" | any = getLocale();

  // Fetch data (SSR)

  const fetchData = async (): Promise<Data | null> => {
    try {
      const res = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BACKENDAPI
        }/v1/apartments/${id}?locale=${await locale}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return res?.data || null;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const data: Data | null = await fetchData();

  return (
    <>
      {/* top section .... grid */}
      {/* content */}
      <div className={styles.cardActions}>
        <ApartmentPage
          id={id}
          start_date={start_date}
          end_date={end_date}
          city={city}
          district={district}
        />
      </div>
      {/* review */}
      <div className={styles.reviewContainer}>
        <div className={styles.reviewHeader}>
          <h4>{(await t)("reviews")}</h4>

          <ReviewModal
            method="POST"
            endpoint={`/v1/reviews/review/${data?.data.id}`}
            data=""
            text={(await t)("addReview")}
            width="100%"
            id={data?.data.id}
            locale={await locale}
          />
        </div>
        <Reviews id={id} />
      </div>
      {/* bottom section ....  */}

    </>
  );
}
