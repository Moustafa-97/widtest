/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "./topRated.module.css";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
const Button = dynamic(() => import("@/Components/Buttons/Button"), {
  ssr: false,
});
const Carousel = dynamic(() => import("@/Components/Carousel/Carousel"), {
  ssr: false,
});

export default function TopRated() {
  const locale: "en" | "ar" | any = useLocale();
  const [data, setData] = React.useState([]);

  useEffect(() => {
      async function fetchOffers(locale: "en" | "ar"): Promise<any[]> {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/home/top-rated-apartments?limit=10&page=1&locale=${await locale}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      }
      fetchOffers(locale).then((data:any) => setData(data));
    }, []);

  const Card = () => {
    return data.map(
      async (item: { ApartmentImage: string; name: string; id: string }) => (
        <div key={item.id} className={styles.card}>
          {item.ApartmentImage && (
            <Image
              width={1000}
              height={1000}
              src={item.ApartmentImage}
              alt="Apartment"
              className={styles.image}
            />
          )}
          <div className={styles.bookParagraph}>
            <p>
              {item.name.length <= 26
                ? `${item.name}`
                : `${item.name.slice(0, 25)}...`}
            </p>
          </div>
          <div className={styles.bookButton}>
            <Button
              text="Book Now"
              onClicks={`${await locale}/apartments/${item.id}`}
              type={undefined}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <>
      <Carousel isFor="toprated" cards={Card()} />
    </>
  );
}
