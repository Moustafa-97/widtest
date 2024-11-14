/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./syggested.module.css";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import dynamic from "next/dynamic";
import { FaBed } from "react-icons/fa";
import { FaRestroom } from "react-icons/fa6";
const Carousel = dynamic(() => import("@/Components/Carousel/Carousel"), {
  ssr: false,
});
import contactimg from "@/public/AboutGarden.png";

import LikeBtn from "./likeBtn/LikeBtn";
import { MdBedroomParent } from "react-icons/md";
import { useLocale } from "next-intl";

// Define the TypeScript type for the offer data structure
type ApartmentOffer = {
  id: number;
  name: string;
  nightlyPrice: number;
  ApartmentAddress: {
    District: {
      name: string;
      City: {
        name: string;
      };
    };
  };
  ApartmentDetails: {
    numberOfBedrooms: number;
    numberOfBeds: number;
    numberOfBathrooms: number;
    numberOfBedRooms: number;
    numberOfGuests: number | null;
  };
  ApartmentImage: string;
  avgRating: number;
  reviewCount: number;
};

export default function Suggested() {
  const locale: "en" | "ar" | any = useLocale();
  const [offers, setOffers] = useState<ApartmentOffer[]>([]);
  useEffect(() => {
    async function fetchOffers(locale: "en" | "ar"): Promise<ApartmentOffer[]> {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/home/most-visited-apartments?limit=8&page=1&locale=${locale}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    }
    fetchOffers(locale).then((data) => setOffers(data));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  // Render cards
  const cards = () => {
    return offers.map((item) => {
      return (
        <div key={item.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              src={item?.ApartmentImage ? item?.ApartmentImage : contactimg}
              alt={item.name}
              width={500}
              height={500}
              property="lazy"
              className={styles.apartmentImage}
            />
            <div className={styles.likeButton}>
              <LikeBtn
                method={"POST"}
                endpoint={`/v1/wishlist/toggle-wish/${item.id}`}
                id={item?.id}
              />
            </div>
          </div>
          <Link
            href={`${locale}/apartments/${item.id}`}
            className={styles.details}
          >
            <h3 className={styles.name}>{item.name}</h3>
            <p className={styles.address}>
              {item.ApartmentAddress.District.name},{" "}
              {item.ApartmentAddress.District.City.name}
            </p>

            <div className={styles.rating}>
              <div className={styles.supply}>
                <FaBed /> <span>{item.ApartmentDetails.numberOfBeds}</span>
              </div>
              <div className={styles.supply}>
                <MdBedroomParent />{" "}
                <span>{item.ApartmentDetails.numberOfBedRooms}</span>
              </div>
              <div className={styles.supply}>
                <FaRestroom />{" "}
                <span>{item.ApartmentDetails.numberOfBathrooms}</span>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <>
      <Carousel isFor="suggest" cards={cards()} />
    </>
  );
}
