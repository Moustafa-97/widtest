"use client";
import React from "react";
import styles from "./apartmentReviews.module.css";
import { useTranslations } from "next-intl";

type Props = {
  rate?: number;
  reviewsNo?: number; 
};

export default function ApartmentReviews({ rate, reviewsNo }: Props) {
  // Handle cases where rate or reviewsNo might be undefined
  const rating = rate ?? 0; 
  const totalReviews = reviewsNo ?? 0; 
  const t = useTranslations("ApartmentReviews")

  return (
    <>
      <div className={styles.roomRate}>
        <p>{rating.toFixed(1)}</p>
      </div>
      <div className={styles.roomRateDetail}>
        <p>
          <span className={styles.roomRateEVGP}>
            {(rating / 5) * 100 > 85
              ? t("excellent")
              : (rating / 5) * 100 > 65
              ? t("verygood")
              : t("good")}
          </span>
          <span className={styles.roomRateReview}>
            {`  ${totalReviews} ${t("reviews")}`}
          </span>
        </p>
      </div>
    </>
  );
}
