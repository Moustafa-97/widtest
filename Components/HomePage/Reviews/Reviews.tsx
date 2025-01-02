/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import styles from "./reviews.module.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
const Carousel = dynamic(() => import("@/Components/Carousel/Carousel"), {
  ssr: false,
});

export default  function Reviews() {
  const locale: "en" | "ar" | any = useLocale();
  const [data, setData] = React.useState([]);
    useEffect(() => {
        async function fetchOffers(locale: "en" | "ar"): Promise<any[]> {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/home/apartments-reviews?limit=5&page=1&locale=${await locale}`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        }
        fetchOffers(locale).then((data:any) => setData(data));
      }, []);

  const Card = () => {
    return data.map(async (item: any, index: number) => (
      
        <div key={index} className={styles.card}>
          <div className={styles.subCard}>
            <div className={styles.textSection}>
              <h4 className={styles.name}>{item.Apartment.ApartmentName}</h4>
              <p className={styles.review}>{item.review}</p>
              <div className={styles.starSection}>
                <div className={styles.starRating}>
                  {[...Array(5)].map((_, ind) => {
                    const starValue = ind + 1;
                    return (
                      <FaStar
                        key={starValue}
                        className={styles.star}
                        size={24}
                        color={starValue <= item.rating ? "#ffc107" : "#e4e5e9"}
                      />
                    );
                  })}
                </div>
              </div>
              <div className={styles.userSection}>
                {item.User.profilePicture && (
                  <Image
                    width={1000}
                    height={1000}
                    placeholder="empty"
                    loading="lazy"
                    src={item.User.profilePicture}
                    alt="Apartment"
                    className={styles.image}
                  />
                )}
                <div className={styles.userDetails}>
                  <p className={styles.userName}>
                    {item.User.lastName} {item.User.lastName}
                  </p>
                  <p className={styles.addressSection}>
                    {item.Apartment.ApartmentAddress.District.name},{" "}
                    {item.Apartment.ApartmentAddress.District.City.name}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.imgSection}>
              {item.Apartment.ApartmentImage && (
                <Image
                  width={1000}
                  height={1000}
                  placeholder="empty"
                  loading="lazy"
                  src={item.Apartment.ApartmentImage}
                  alt="Apartment"
                  className={styles.image}
                />
              )}
            </div>
          </div>
        </div>
      
    ));
  };

  return (
    <>
      <Carousel isFor="review" cards={Card()} />
    </>
  );
}
