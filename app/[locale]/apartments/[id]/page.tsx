/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Button from "@/Components/Buttons/Button";
import axios from "axios";
import styles from "./apartmentDetails.module.css";
import { BiLocationPlus } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { getLocale, getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { OrbitProgress } from "react-loading-indicators";
import Image from "next/image";
import pet from "./pet.svg";
import bed from "./bed.svg";
import bath from "./bath.svg";
const ApiButton = dynamic(() => import("@/Components/Buttons/ApiButton"), {
  ssr: false,
});
const StarRating = dynamic(() => import("@/Components/StarRating/StarRating"), {
  ssr: false,
});
const ApartmentReviews = dynamic(
  () => import("@/Components/ApartmentReviews/ApartmentReviews"),
  {
    ssr: false,
    loading: () => (
      <OrbitProgress variant="dotted" dense color={"#47b3c5"} size="large" />
    ),
  }
);
const ImageSection = dynamic(
  () => import("@/Components/ImageElement/ImageSection"),
  {
    ssr: false,
    loading: () => (
      <OrbitProgress variant="dotted" dense color={"#47b3c5"} size="large" />
    ),
  }
);
const Amenities = dynamic(
  () => import("@/Components/amenitiesComp/Amenities"),
  {
    ssr: false,
    loading: () => (
      <OrbitProgress variant="dotted" dense color={"#47b3c5"} size="large" />
    ),
  }
);
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
  const ts = getTranslations("SearchPage");

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

  const lon = data?.data.ApartmentAddress.longitude;
  const lat = data?.data.ApartmentAddress.latitude;

  return (
    <>
      {/* top section .... grid */}
      {/* content */}
      <div className={styles.cardActions}>
        {/* description */}
        <div className={styles.cardDesc}>
          {/* apartment name */}
          <div className={styles.name}>
            <p>{data?.data.name}</p>
          </div>
          {/* address */}
          <div className={styles.address}>
            <p>
              <span>
                <BiLocationPlus />
              </span>
              {`${data?.data.ApartmentAddress.addressLine}, ${data?.data.ApartmentAddress.City.name}, ${data?.data.ApartmentAddress.District.name}`}
            </p>
          </div>
          {/* rating */}
          <div className={styles.rating}>
            <StarRating rating={data?.data.avgRating} />
          </div>
          {/* ApartmentReviews */}
          <div className={styles.roomReviews}>
            <ApartmentReviews
              rate={data?.data.avgRating}
              reviewsNo={data?.data.reviewCount}
            />
          </div>
          {/* price/night */}
          <div className={styles.roomPrice}>
            <div className={styles.roomDetailsPrice}>
              <p>${`${data?.data.nightlyPrice}`}</p>
              <span>/{(await ts)("night")}</span>
            </div>
          </div>
          {/* buttons */}
          <div className={styles.cardButtons}>
            <div className={styles.apiBtn}>
              <ApiButton
                icon={<CiHeart />}
                method={"POST"}
                endpoint={`/v1/wishlist/toggle-wish/${id}`}
                id={data?.data.id}
              />
            </div>
            <div className={styles.apiBtn}>
              <ApiButton
                icon={<IoMdShare />}
                method={"POST"}
                endpoint={`/v1/wishlist/toggle-wish/${id}`}
              />
            </div>
            <div className={styles.viewBtn}>
              <Button
                text={(await ts)("bookNow")}
                onClicks={`${id}/payment?start_date=${start_date}&end_date=${end_date}&city=${city}&district=${district}`}
                type={undefined}
              />
            </div>
          </div>
          {/* images */}

          <div className={styles.galleryContainer}>
            <ImageSection images={data?.data?.ApartmentImages} />
          </div>
        </div>
      </div>
      {/* bottom section ....  */}

      <div className={styles.bottomSection}>
        <div className={styles.textContainer}>
          <h4>{(await ts)("overview")}</h4>
          <p>{data?.data.description}</p>
          <p style={{ fontWeight: "bolder", marginTop: "17px" }}>
            {(await ts)("checkInAndOut")}
          </p>
        </div>
        {/* edit */}
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <p className={styles.cardHeader}>
              {data?.data?.avgRating ?? (await t)("noRating")}
            </p>
            <p className={styles.rateCardComp}>
              {data?.data?.avgRating
                ? (data.data.avgRating / 5) * 100 > 85
                  ? (await t)("excellent")
                  : (data.data.avgRating / 5) * 100 > 65
                  ? (await t)("verygood")
                  : (await t)("good")
                : (await t)("noRating")}
            </p>
            <p className={styles.reviewCardComp}>
              {data?.data?.reviewCount ?? "0"} reviews
            </p>
          </div>

          {/*  */}
          <div className={styles.card}>
            <p className={styles.cardHeader}>
              {data?.data.ApartmentDetails?.isPetsAllowed
                ? (await t)("allowPets")
                : (await t)("noAllowPets")}
            </p>

            <Image src={pet} width={100} height={100} loading="lazy" alt={""} />
          </div>
          {/*  */}
          <div className={styles.card}>
            <p className={styles.cardHeader}>
              {" "}
              {data?.data.ApartmentDetails?.numberOfBedRooms}{" "}
              {(await t)("bedroom")}
            </p>
            <Image src={bed} width={100} height={100} loading="lazy" alt={""} />
          </div>
          {/*  */}
          <div className={styles.card}>
            <p className={styles.cardHeader}>
              {" "}
              {data?.data.ApartmentDetails?.numberOfBathrooms}{" "}
              {(await t)("bath")}
            </p>
            <Image
              src={bath}
              width={100}
              height={100}
              loading="lazy"
              alt={""}
            />
          </div>
        </div>
        {/* edit */}
        {/* location */}
        <div className={styles.locationContainer}>
          <div className={styles.locationHeader}>
            <h4>{(await t)("location")}</h4>
            <button className={styles.gmapButton}>
              {(await t)("viewGoogle")}
            </button>
          </div>
          <div className={styles.locationMap}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon}%2C${lat}%2C${lon}%2C${lat}&layer=mapnik&marker=${lat}%2C${lon}`}
              allowFullScreen={true}
              aria-hidden="false"
            ></iframe>
          </div>
        </div>
        <div className={styles.amenitiesContainer}>
          <h4>{(await t)("amenities")}</h4>
          <Amenities amenities={data?.data.ApartmentAmenities} />
        </div>
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
    </>
  );
}
