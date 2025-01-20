/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import styles from "./apartmentPage.module.css";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import locationPin from "@/public/icons/locationPinApartment.svg";
import Image from "next/image";
import Loading from "@/app/[locale]/loading";
import StarRating from "@/Components/StarRating/StarRating";
import Link from "next/link";
import ApiButton from "@/Components/Buttons/ApiButton";
import { CiHeart } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import pet from "@/public/icons/pet.svg";
import bed from "@/public/icons/bed.svg";
import bath from "@/public/icons/bath.svg";
import Amenities from "@/Components/amenitiesComp/Amenities";

type City = {
  id: number;
  name: string;
};

type District = {
  id: number;
  name: string;
};

type ApartmentAddress = {
  addressLine: string;
  City: City;
  District: District;
  latitude: number;
  longitude: number;
  postalCode: string;
};

type ApartmentDetails = {
  sizeArea: number;
  numberOfBedRooms: number;
  numberOfBeds: number;
  numberOfBathrooms: number;
  numberOfGuests: number | null;
  isFurnished: boolean;
  isPetsAllowed: boolean;
};

type ApartmentImage = {
  id: string;
  imageUrl: string;
};

type CancellationPolicy = {
  id: string;
  fullRefundDeadlineHours: number;
  cancellationType:
    | "PARTIALLY_REFUNDABLE"
    | "FULLY_REFUNDABLE"
    | "NON_REFUNDABLE";
  refundPercentage: number;
};

type ApartmentOffer = {
  id: string;
  name: string;
  description: string;
  freeNights: number;
  nightsRequired: number;
};

type ApartmentAmenities = {
  hasFreeParking: boolean;
  hasBalcony: boolean;
  hasWifi: boolean;
  hasTv: boolean;
  hasShampoo: boolean;
  hasHairDryer: boolean;
  hasKitchen: boolean;
  hasFridge: boolean;
  hasDishwasher: boolean;
  hasOven: boolean;
  hasElevator: boolean;
};

type Apartment = {
  id: string;
  name: string;
  description: string;
  nightlyPrice: number;
  ApartmentAddress: ApartmentAddress;
  ApartmentDetails: ApartmentDetails;
  ApartmentImages: ApartmentImage[];
  CancellationPolicy: CancellationPolicy;
  ApartmentOffer: ApartmentOffer;
  avgRating: number;
  reviewCount: number;
  isWished: boolean;
  ApartmentAmenities: ApartmentAmenities;
};

type ApiResponse = {
  data: Apartment;
};
type Props = {
  id: string;
  start_date: string;
  end_date: string;
  city: string;
  district: string;
};
function ApartmentPage(props: Props) {
  // props definitions
  const { id, start_date, end_date, city, district } = props;

  // i18n
  const t = useTranslations("ApartmentReviews");
  const ts = useTranslations("SearchPage");
  const locale = useLocale();

  //   modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: currentSlide,
    loop: true,
    slides: {
      perView: 1,
      spacing: 25,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const openModal = (index: number) => {
    setCurrentSlide(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const navigateSlide = (direction: "prev" | "next") => {
    if (direction === "prev") instanceRef.current?.prev();
    if (direction === "next") instanceRef.current?.next();
  };

  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  //   backend api data
  const [apartment, setApartment] = React.useState<ApiResponse>(
    {} as ApiResponse
  );
  React.useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/apartments/${id}?locale=${locale}`
      )
      .then((response) => {
        setApartment(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //   console.log(apartment);
  const rating = () => {
    if (apartment.data.avgRating === 0) {
      return t("noRating");
    } else if (apartment.data.avgRating > 0 && apartment.data.avgRating < 1.5) {
      return t("poor");
    } else if (apartment.data.avgRating > 1.5 && apartment.data.avgRating < 3) {
      return t("good");
    } else if (apartment.data.avgRating > 3 && apartment.data.avgRating < 4.5) {
      return t("verygood");
    } else {
      return t("excellent");
    }
  };

  // map functions
  const [mapCover, setMapCover] = React.useState(true);
  const lon = apartment?.data?.ApartmentAddress.longitude;
  const lat = apartment?.data?.ApartmentAddress.latitude;
  const navigateToGoogleMaps = () => {
    if (
      apartment.data.ApartmentAddress.longitude &&
      apartment.data.ApartmentAddress.latitude
    )
      window.open(`https://www.google.com/maps?q=${lat},${lon}`, "_blank");
  };
  return (
    <>
      <div className={styles.container}>
        {apartment.data ? (
          <>
            {/* start top section */}
            <div className={styles.apartmentDetails}>
              {/* details */}
              <div className={styles.details}>
                <h3 className={styles.name}>{apartment.data.name}</h3>
                <p className={styles.location}>
                  <span>
                    <Image src={locationPin} alt="location pin" />
                  </span>
                  {`${apartment?.data.ApartmentAddress.addressLine}, ${apartment?.data.ApartmentAddress.City.name}, ${apartment?.data.ApartmentAddress.District.name}`}
                </p>
                <div className={styles.rate}>
                  <p className={styles.rating}>
                    {apartment.data.avgRating.toFixed(1)}
                  </p>
                  <p className={styles.reviews}>
                    {" "}
                    <span>{rating()},</span> {apartment.data.reviewCount}{" "}
                    {t("reviews")}
                  </p>
                </div>
              </div>
              {/* price & stars */}
              <div className={styles.priceAndStars}>
                <div className={styles.stars}>
                  <StarRating rating={apartment.data.avgRating} />
                </div>
                <div className={styles.price}>
                  <p className={styles.priceText}>
                    {apartment.data.nightlyPrice}
                    <span>{t("perNight")}</span>
                  </p>
                </div>
              </div>
              {/* btns */}
              <div className={styles.buttons}>
                <div className={styles.likeBtn}>
                  <ApiButton
                    icon={<CiHeart />}
                    method={"POST"}
                    endpoint={`/v1/wishlist/toggle-wish/${id}`}
                    id={apartment?.data.id}
                  />
                </div>
                <div className={styles.shareBtn}>
                  <ApiButton
                    icon={<IoMdShare />}
                    method={"POST"}
                    endpoint={`/v1/wishlist/toggle-wish/${id}`}
                  />
                </div>
                {/* book now */}
                <div className={styles.btn}>
                  <Link
                    href={`${id}/payment?start_date=${start_date}&end_date=${end_date}&city=${city}&district=${district}`}
                  >
                    {t("bookNow")}
                  </Link>
                </div>
              </div>

              <div
                className={`${styles.imageContainer} ${
                  apartment?.data?.ApartmentImages?.length === 1
                    ? styles.singleImage
                    : apartment?.data?.ApartmentImages?.length === 2
                    ? styles.doubleImage
                    : apartment?.data?.ApartmentImages?.length === 3
                    ? styles.tripleImage
                    : apartment?.data?.ApartmentImages?.length === 4
                    ? styles.fourImage
                    : apartment?.data?.ApartmentImages?.length > 4
                    ? styles.moreThanFour
                    : ""
                }`}
              >
                {apartment.data.ApartmentImages.map(
                  (image: { id: string; imageUrl: string }, index: number) => (
                    <Image
                      key={image.id}
                      src={image.imageUrl}
                      alt="Apartment"
                      className={`${styles.apartmentImage}
                    ${styles[`image_${index.toString()}`]}
                    
                    `}
                      width={1000}
                      height={1000}
                      onClick={() => openModal(index)}
                    />
                  )
                )}
              </div>
            </div>
            {/* end top section */}
            {/* --------------------- */}
            {/* start overview */}
            <div className={styles.overviewContainer}>
              <div className={styles.textContainer}>
                <h4 className={styles.overview}>{ts("overview")}</h4>
                <p className={styles.description}>
                  {apartment?.data.description}
                </p>
                <p
                  className={styles.checkInOut}
                  style={{ fontWeight: "bolder" }}
                >
                  {ts("checkInAndOut")}
                </p>
              </div>

              <div className={styles.cardContainer}>
                <div className={`${styles.card} ${styles.rateCard}`}>
                  <p className={styles.cardHeader}>
                    {apartment?.data?.avgRating.toFixed(1) ?? t("noRating")}
                  </p>
                  <div className={styles.rateAndReview}>
                    <p className={styles.rateCardComp}>{rating()}</p>
                    <p className={styles.reviewCardComp}>
                      {apartment?.data?.reviewCount ?? "0"} {t("reviews")}
                    </p>
                  </div>
                </div>

                {/*  */}
                <div className={`${styles.card} ${styles.allowCard}`}>
                  <p className={styles.cardHeader}>
                    {apartment?.data.ApartmentDetails?.isPetsAllowed
                      ? t("allowPets")
                      : t("noAllowPets")}
                  </p>
                  <div className={styles.cardIcon}>
                    <Image
                      src={pet}
                      width={100}
                      height={100}
                      loading="lazy"
                      alt={"PAW"}
                    />
                  </div>
                </div>
                {/*  */}
                <div className={`${styles.card} ${styles.allowCard}`}>
                  <p className={styles.cardHeader}>
                    {" "}
                    {apartment?.data.ApartmentDetails?.numberOfBedRooms}{" "}
                    {t("bedroom")}
                  </p>
                  <div className={styles.cardIcon}>
                    <Image
                      src={bed}
                      width={100}
                      height={100}
                      loading="lazy"
                      alt={""}
                    />
                  </div>
                </div>
                {/*  */}
                <div className={`${styles.card} ${styles.allowCard}`}>
                  <p className={styles.cardHeader}>
                    {" "}
                    {apartment?.data.ApartmentDetails?.numberOfBathrooms}{" "}
                    {t("bath")}
                  </p>
                  <div className={styles.cardIcon}>
                    <Image
                      src={bath}
                      width={100}
                      height={100}
                      loading="lazy"
                      alt={""}
                    />
                  </div>
                </div>
              </div>
              {/* map */}
            </div>
            {/* end overview */}
            {/* ------------------ */}
            {/* start map */}
            <div className={styles.mapContainer}>
              <div className={styles.mapHeaderText}>
                <h4 className={styles.location}>{t("location")}</h4>
              </div>
              <div className={styles.mapHeaderBtn}>
                <button
                  onClick={() => navigateToGoogleMaps()}
                  className={styles.gmapButton}
                >
                  {t("viewGoogle")}
                </button>
              </div>
              <div className={styles.locationMap}>
                {mapCover && (
                  <div
                    className={styles.locationMapCover}
                    onClick={() => setMapCover(false)}
                  >
                    <div className={styles.mapCover}></div>
                    <p>click to navigate</p>
                  </div>
                )}
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon}%2C${lat}%2C${lon}%2C${lat}&layer=mapnik&marker=${lat}%2C${lon}`}
                  allowFullScreen={true}
                  aria-hidden="false"
                ></iframe>
              </div>
            </div>
            {/* end map */}
            {/* ---------------- */}
            {/* start amenities */}
            <div className={styles.amenitiesContainer}>
              <h4>{t("amenities")}</h4>
              <div className={styles.amenitiesWrapper}>
                <Amenities amenities={apartment?.data.ApartmentAmenities} />
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={`${styles.sliderWrapper} keen-slider`}
            ref={sliderRef}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking slider
          >
            {apartment.data.ApartmentImages.map((image) => (
              <div key={image.id} className="keen-slider__slide">
                <Image
                  src={image.imageUrl}
                  alt="Apartment"
                  width={1000}
                  height={1000}
                  className={styles.modalImage}
                />
              </div>
            ))}
          </div>
          {/* Navigation Arrows */}
          <button
            className={styles.prevButton}
            onClick={(e) => {
              e.stopPropagation();
              navigateSlide("prev");
            }}
          >
            &#8592;
          </button>
          <button
            className={styles.nextButton}
            onClick={(e) => {
              e.stopPropagation();
              navigateSlide("next");
            }}
          >
            &#8594;
          </button>
        </div>
      )}
    </>
  );
}

export default ApartmentPage;
