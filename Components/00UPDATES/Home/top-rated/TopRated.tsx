/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import styles from "./topRated.module.css";
import Image from "next/image";
import Link from "next/link";

// keen slyder imports
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { useLocale, useTranslations } from "next-intl";
import axios from "axios";
import Loading from "@/app/[locale]/loading";

type District = {
  name: string;
  City: Record<string, never>; // If the City object is always empty
};

type ApartmentAddress = {
  District: District;
};

type BackendResponse = {
  id: string;
  name: string;
  nightlyPrice: number;
  avgRating: number;
  ApartmentAddress: ApartmentAddress;
  ApartmentImage: string;
};
function TopRated() {
  // i18n
  const t = useTranslations("HomePage");
  const locale = useLocale();

  //   backend api
  const [apartments, setApartments] = React.useState<BackendResponse[]>([]);
  React.useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/home/top-rated-apartments?limit=10&page=1&locale=${locale}`
      )
      .then((response) => {
        setApartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // keen slyder config
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    breakpoints: {
      "(min-width: 430px)": {
        slides: {
          perView: 1,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 21,
        },
      },
      "(min-width: 1025px)": {
        slides: {
          perView: 3,
          spacing: 25,
        },
      },
    },

    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // auto slyding config
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  // Function to start auto-slide
  const startAutoSlide = () => {
    if (!timer) return;
    if (apartments.length > 0) {
      timer.current = setInterval(() => {
        instanceRef.current?.next();
      }, 2500);
    }
  };

  const stopAutoSlide = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  };

  React.useEffect(() => {
    startAutoSlide();

    return () => stopAutoSlide();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {apartments.length > 0 ? (
          <>
            <div className={styles.header}>
              <div className={styles.sideLine}></div>
              <div className={styles.headerTitle}>
                <h3>{t("topRatedTitle")}</h3>
                <p>{t("browse")}</p>
              </div>
            </div>
            <div className={styles.cards}>
              <div
                onMouseEnter={stopAutoSlide}
                onMouseLeave={startAutoSlide}
                ref={sliderRef}
                className={`${styles.keenSlider} keen-slider`}
              >
                {apartments &&
                  apartments.map((apartment, index) => (
                    <div
                      key={index}
                      className={`keen-slider__slide ${styles.cardSlide}`}
                    >
                      {/* image */}
                      <div className={styles.image}>
                        <Image
                          src={apartment.ApartmentImage}
                          alt="image"
                          width={1000}
                          height={1000}
                        />
                      </div>

                      {/* content */}
                      <div className={styles.cardContent}>
                        <div className={styles.apartmentName}>
                          <h3>{apartment.name?.split(" - ")[0]}</h3>
                        </div>
                        <div className={styles.btn}>
                          <Link href={`${locale}/apartments/${apartment.id}`}>
                            {t("booknow")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {loaded && instanceRef.current && (
                <div className={styles.dots}>
                  {[
                    ...Array(
                      instanceRef.current.track.details?.slides.length
                    ).keys(),
                  ].map((idx) => {
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          instanceRef.current?.moveToIdx(idx);
                        }}
                        className={`
                    ${styles.dot} ${currentSlide === idx ? styles.active : ""}
                    `}
                      ></button>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default TopRated;
