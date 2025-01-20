/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaStar } from "react-icons/fa";
import styles from "./StarRating.module.css"; 
import React from "react";

interface StarRatingProps {
  rating: number | any;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {

  return (
    <>
      <div className={styles.starSection}>
        <div className={styles.starRating}>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <FaStar
                key={starValue}
                className={styles.star}
                size={16}
                color={starValue <= rating ? "#FF8682" : "#ff868252"}
                
              />
            );
          })}
        </div>
        <div className={styles.value}>
          <p>{rating?.toFixed(1)} stars apartment</p>
        </div>
      </div>
    </>
  );
};

export default StarRating;
