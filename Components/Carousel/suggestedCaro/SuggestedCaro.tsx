/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./carousel.module.css";

type Props = {
  cards: any[];
};

const SuggestedCaro = (props: Props) => {
  const { cards } = props;

  const [screenWidth, setScreenWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const calculatePerView = (width: number) => (width <= 800 ? 1 : 2);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: calculatePerView(screenWidth),
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

      // Update the KeenSlider settings dynamically on resize
      if (instanceRef.current) {
        instanceRef.current.update({
          slides: {
            perView: calculatePerView(newWidth),
            spacing: 15,
          },
        });
      }
    };

    handleResize(); // Set initial screen size and perView
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [instanceRef]);

  if (!cards || cards.length === 0) {
    return null; // Handle empty cards gracefully
  }

  // Calculate the number of dots to display
  const perView = calculatePerView(screenWidth);
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
              style={{ backgroundColor: "#fff" }}
              className={`${styles.card} number-slide${index + 1}`}
            >
              {card}
            </div>
          </div>
        ))}
      </div>
      {dotsCount > 1 ? (
        <div className={styles.dots}>
          {Array.from({ length: dotsCount }).map((_, idx) => (
            <div
              key={idx}
              className={`${styles.dot} ${
                currentSlide === idx ? styles.active : ""
              }`}
              onClick={() => handleDotClick(idx)}
            ></div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedCaro;
