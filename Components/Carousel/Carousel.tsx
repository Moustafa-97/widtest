/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./carousel.module.css";

type Props = {
  cards: any[];
  isFor: string;
};

const Carousel = (props: Props) => {
  const { cards, isFor } = props;

  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  const calculatePerView = (width: number, isFor: string) => {
    if (width <= 800) return 1;
    return isFor === "suggest" ? 2 : 3;
  };

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: calculatePerView(screenWidth, isFor),
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);

      if (instanceRef.current) {
        instanceRef.current.update({
          slides: {
            perView: calculatePerView(newWidth, isFor),
            spacing: 15,
          },
        });
      }
    };

    handleResize(); // Set initial values
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [instanceRef, isFor]);

  if (!cards || cards.length === 0) {
    return null;
  }

  // Calculate the number of dots to display
  const perView = calculatePerView(screenWidth, isFor);
  const dotsCount = Math.max(0, cards.length - perView) + 1;

  const handleDotClick = (index: number) => {
    instanceRef.current?.moveToIdx(index);
  };

  return (
    <div className={styles.carouselContainer}>
      <div ref={sliderRef} className={`${styles.keenSlider} keen-slider`}>
        {cards.map((card, index) => (
          <div key={index} className="keen-slider__slide">
            <div
              style={isFor === "suggest" ? { backgroundColor: "#fff" } : {}}
              className={`${styles.card} number-slide${index + 1}`}
            >
              {card}
            </div>
          </div>
        ))}
      </div>
      {dotsCount > 1 && (
        <div className={styles.dots}>
          {Array.from({ length: dotsCount }).map((_, idx) => (
            <div
              key={idx}
              className={`${styles.dot} ${
                currentSlide == idx ? styles.active : ""
              }`}
              onClick={() => handleDotClick(idx)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
