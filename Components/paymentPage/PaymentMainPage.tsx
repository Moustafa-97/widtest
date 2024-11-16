/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./payment.module.css";
import pic from "@/public/payment-page-room.jpeg";
import logo from "@/public/hotelLogo.jpeg";
import { RiHotelFill } from "react-icons/ri";
import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";
import ApartmentReviews from "../ApartmentReviews/ApartmentReviews";
import PaymentBtn from "../Buttons/paymentBtn/PaymentBtn";
import { useLocale, useTranslations } from "next-intl";
import { FaLocationPin } from "react-icons/fa6";

const Visa = dynamic(() => import("@/Components/Visa/Visa"), { ssr: false });
const DateSelect = dynamic(() => import("./dateSelect/DateSelect"), {
  ssr: false,
});
type ApiResponse = {
  message: string;
  booking: {
    localizedBookedApartment: {
      bookingId: string;
      totalPrice: number;
      cleaningFee: number;
      vat: number;
      checkInDate: string;
      checkOutDate: string;
      numberOfNights: number;
      isOfferApplied: boolean;
      totalNightsPrice: number;
      bookingStatus: string;
      Apartment: {
        name: string;
        nightlyPrice: number;
        ApartmentImage: string;
        avgRating: number;
        reviewCount: number;
        ApartmentAddress: {
          addressLine: string;
          District: {
            name: string;
            City: {
              name: string;
            };
          };
        };
      };
    };
    priceWithoutOffer: {
      NightsPrice: number;
      cleaningFee: number;
      vat: number;
      total: number;
    };
  };
  userBillingDetails: {
    id: string;
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    createdAt: string;
    updatedAt: string;
  };
};

type Data = {
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
      longitude: number;
      latitude: number;
    };
    ApartmentImages: {
      id: string;
      imageUrl: string;
    }[];
    ApartmentAmenities: {
      hasAirConditioning: boolean;
      hasBalcony: boolean;
      hasCleaningProducts: boolean;
      hasClutery: boolean;
      hasCoffeeMaker: boolean;
      hasDishwasher: boolean;
      hasDryer: boolean;
      hasEVCharger: boolean;
      hasElevator: boolean;
      hasEssentials: boolean;
      hasFreeParking: boolean;
      hasFridge: boolean;
      hasHairDryer: boolean;
      hasHeating: boolean;
      hasIron: boolean;
      hasKitchen: boolean;
      hasOven: boolean;
      hasShampoo: boolean;
      hasTv: boolean;
      hasWashingMachine: boolean;
      hasWheelchairAccess: boolean;
      hasWifi: boolean;
    };
    avgRating: number;
    reviewCount: number;
    isWished: boolean;
  };
};

type Props = {
  start_date: string;
  end_date: string;
  city: string;
  district: string;
  id: number;
};

const PaymentMainPage: React.FC<Props> = ({ start_date, end_date, id }) => {
  const [billData, setBillData] = useState<ApiResponse | null>(null);
  const [apartmentData, setApartmentData] = useState<Data | null>(null);
  const locale = useLocale();
  const token = localStorage.getItem("token");
  const t = useTranslations("Payment");

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/apartments/${id}/book`,
          {
            checkInDate: start_date,
            checkOutDate: end_date,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setBillData(res.data);
      } catch (err) {
        console.error("Failed to fetch billing data", err);
      }
    };

    const fetchApartmentData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/apartments/${id}?locale=${locale}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setApartmentData(res.data);
      } catch (err) {
        console.error("Failed to fetch apartment data", err);
      }
    };

    fetchBill();
    fetchApartmentData();
  }, [start_date, end_date, id, locale, token]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(
      locale === "en" ? "en-US" : "ar-EG",
      options
    );
  };

  const startDate = formatDate(start_date);
  const endDate = formatDate(end_date);
  const bill = billData?.booking?.localizedBookedApartment;

  const apartment = apartmentData?.data;

  const [userVisa, setUserVisa] = useState<string | null>(null);

  return (
    <section
      className="g-container"
      style={{ width: "100vw", minHeight: "fit-content" }}
    >
      <div className={styles.paymentCard}>
        <section className={styles.paymentCardImage}>
          <Image
            width={500}
            height={500}
            placeholder="empty"
            loading="eager"
            src={pic}
            alt="Pick your home"
            className={styles.image}
          />
        </section>

        <div className={styles.cardsSection}>
          <section className={styles.detailsCard}>
            <div className={styles.roomDetails}>
              <div className={styles.roomDescription}>
                <p>{apartment?.name}</p>
              </div>
              <div className={styles.roomDetailsPrice}>
                <p>${apartment?.nightlyPrice}</p>
                <span>/night</span>
              </div>
            </div>

            <div className={styles.locationDetails}>
              <div className={styles.hotelLogo}>
                <Image
                  width={500}
                  height={500}
                  src={logo}
                  alt="Room for payment"
                  className={styles.image}
                />
              </div>
              <div className={styles.hotelLocation}>
                <div className={styles.hotelName}>
                  <p>{apartment?.name}</p>
                </div>
                <div className={styles.hotelLocationPin}>
                  <p>
                    <span>
                      <FaLocationPin />
                    </span>
                    <span>
                      {`${apartment?.ApartmentAddress.addressLine}, ${apartment?.ApartmentAddress.City.name}, ${apartment?.ApartmentAddress.District.name}`}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {startDate === "Invalid Date" && endDate === "Invalid Date" ? (
              <div className={styles.noBookingTime}>
                <DateSelect id={id} />
              </div>
            ) : (
              <div className={styles.bookingTime}>
                <div className={styles.bookingCheck}>
                  <div className={styles.bookingCheckDate}>
                    <p>{startDate}</p>
                  </div>
                  <p className={styles.bookingP}>check in</p>
                </div>
                <div className={styles.bookingLogo}>
                  <span>
                    <RiHotelFill />
                  </span>
                </div>
                <div className={styles.bookingCheck}>
                  <div className={styles.bookingCheckDate}>
                    <p>{endDate}</p>
                  </div>
                  <p className={styles.bookingP}>check out</p>
                </div>
              </div>
            )}
          </section>

          {bill ? (
            <section className={styles.chechoutCard}>
              <div className={styles.chechoutCardRoom}>
                <div className={styles.roomOwner}>
                  <p>{bill?.Apartment?.name}</p>
                </div>
                <div className={styles.roomDetails}>
                  <p>{bill?.Apartment?.name}</p>
                </div>
                <div className={styles.roomRating}>
                  <ApartmentReviews rate={bill?.Apartment?.avgRating} />
                </div>
                <div className={styles.roomProtection}>
                  <p>Your booking protected by wid</p>
                </div>
              </div>
              <div className={styles.chechoutCardBill}>
                <div className={styles.chechoutBillHeader}>
                  <p>{t("title")}</p>
                </div>

                <div className={styles.chechoutBill}>
                  <ul>
                    <li>
                      <p>Base Fare</p>
                      <span> $ {bill?.totalNightsPrice}</span>
                    </li>

                    <li>
                      <p>Cleaning fee</p>
                      <span> $ {bill?.cleaningFee}</span>
                    </li>

                    <li>
                      <p>Taxes (VAT. 15%)</p>
                      <span> $ {bill?.vat}</span>
                    </li>

                    <li className={styles.chechoutBillTotal}>
                      <p>Total</p>
                      <span> $ {bill?.totalPrice}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          ) : (
            <section className={styles.chechoutCard}>
              <div className={styles.noDate}>Please select a date</div>
            </section>
          )}

          <section
            className={`${styles.visa} ${
              startDate === "Invalid Date" && endDate === "Invalid Date"
                ? ""
                : styles.transform
            }`}
          >
            <Visa setUserVisa={setUserVisa} />
          </section>
          <section className={styles.pay}>
            <PaymentBtn
              text="Pay Now"
              method="POST"
              data={{ checkInDate: start_date, checkOutDate: end_date }}
              endpoint1={`/v1/booking/pay-with-saved-card/${bill?.bookingId}?locale=ar`}
              endpoint2={`/v1/booking/check-availability-and-lock/${apartment?.id}`}
              width="100%"
              token={token}
              locale={locale}
              userVisa={userVisa}
            />
          </section>
        </div>
      </div>
    </section>
  );
};

export default PaymentMainPage;
