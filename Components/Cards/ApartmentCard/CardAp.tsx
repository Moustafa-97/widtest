/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import styles from "./cardap.module.css";
import image from "../../../public/AboutGarden.png";
import Button from "@/Components/Buttons/Button";
import StarRating from "@/Components/StarRating/StarRating";
import { BiLocationPlus } from "react-icons/bi";
import ApartmentReviews from "@/Components/ApartmentReviews/ApartmentReviews";
import ApiButton from "@/Components/Buttons/ApiButton";
import { CiHeart } from "react-icons/ci";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClicks: string;
  apartmentData:
    | {
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
          };
          ApartmentImages: {
            id: string;
            imageUrl: string;
          }[];
          avgRating: number;
          reviewCount: number;
          isWished: boolean;
          ApartmentImage: string;
        };
      }
    | any;
};
type Data =
  | {
      id: number;
      name: string;
      nightlyPrice: number;
      avgRating: number;
      reviewCount: number;
      isWished: boolean;
      ApartmentImage: string;
      ApartmentAddress: {
        addressLine: string;
        City: { id: number; name: string };
      };
      District: { id: number; name: string };
      ApartmentImages: { id: string; imageUrl: string }[];
    }[]
  | any;

export default function CardAp(props: Props) {
  // const locale = useLocale();
  const { apartmentData } = props;
  const t = useTranslations("SearchPage");

  const data: Data = useMemo(() => apartmentData, [apartmentData]);
  return (
    <>
      <section className={styles.cardAp}>
        {/* image devision */}
        <div className={styles.cardS}>
          <div className={styles.image}>
            {data && data?.ApartmentImage ? (
              <Image
                src={data?.ApartmentImage}
                alt="test"
                width={1000}
                height={1000}
                loading="eager"
                placeholder="empty"
              />
            ) : (
              <Image
                src={image}
                alt="test"
                width={1000}
                height={1000}
                loading="eager"
                placeholder="empty"
              />
            )}
          </div>
        </div>
        {/* content + button */}
        <div className={styles.cardActions}>
          {/* description */}
          <div className={styles.cardDesc}>
            <div className={styles.roomDesc}>
              {/*  */}
              <div className={styles.name}>
                <p>{data?.name}</p>
              </div>
              {/*  */}
              <div className={styles.address}>
                <p>
                  <span>
                    <BiLocationPlus />
                  </span>
                  {data?.ApartmentAddress?.addressLine
                    ? `${data.ApartmentAddress.addressLine},`
                    : ""}
                  {data?.ApartmentAddress?.City?.name
                    ? `${data.ApartmentAddress.City.name},`
                    : ""}
                  {data?.ApartmentAddress?.District?.name
                    ? `${data.ApartmentAddress.District.name}`
                    : ""}
                </p>
              </div>
              {/*  */}
              <div className={styles.rating}>
                <div className={styles.ratingStars}>
                  <StarRating rating={data?.avgRating} />
                </div>
              </div>
              {/*  */}
              <div className={styles.roomReviews}>
                <ApartmentReviews rate={data?.avgRating} />
              </div>
              {/*  */}
            </div>

            <div className={styles.roomPrice}>
              <div className={styles.priceStart}>
                <p>{t("startingFrom")}</p>
              </div>
              <div className={styles.roomDetailsPrice}>
                <p>${`${data?.nightlyPrice}`}</p>
                <span>/{t("night")}</span>
              </div>
            </div>
          </div>
          {/* actions or buttons */}
          <div className={styles.cardButtons}>
            <div className={styles.apiBtn}>
              <ApiButton
                icon={<CiHeart />}
                method={"POST"}
                endpoint={`/v1/wishlist/toggle-wish/${data?.id}`}
                id={data?.id}
              />
            </div>
            <div className={styles.viewBtn}>
              <Button
                text={t("view")}
                onClicks={`apartments/${data?.id}/${props.onClicks}`}
                type={undefined}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
