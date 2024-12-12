/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/Components/Buttons/Button";
import Image from "next/image";
import React from "react";
import styles from "./history.module.css";
import { useLocale } from "next-intl";
import ModalButton from "@/Components/modal/ModalBtn";

export default async function History({
  history,
}: {
  token: string | any;
  history:
    | {
        id: string;
        checkInDate: string;
        checkOutDate: string;
        bookingStatus: string;
        createdAt: string;
        Apartment: {
          id: string;
          name: string;
          ApartmentAddress: {
            district: string;
            city: string;
          };
          ApartmentImage: string;
          PaymentAmount: null;
          CancellationPolicy: {
            id: string;
            fullRefundDeadlineHours: number;
            cancellationType: string;
            refundPercentage: number;
          };
          refundableAmount: null;
        };
      }[]
    | null
    | any;
}) {
  const locale: "en" | "ar" | unknown = useLocale();
  // console.log(history);

  return (
    <>
      <section className={styles.card}>
        <ul>
          {history &&
            history.map(async (history: any, index: number) => (
              <>
                <li key={index} className={styles.singleCard}>
                  <div className={styles.image}>
                    <Image
                      src={history.Apartment.ApartmentImage}
                      alt="Apartment"
                      width={100}
                      height={100}
                      loading="lazy"
                      placeholder="empty"
                    />
                  </div>
                  {/* apartment name */}
                  <div className={styles.apartmentName}>
                    <p>{history.Apartment.name}</p>
                  </div>
                  {/* in & out */}
                  <div className={styles.inOut}>
                    <div className={styles.chIn}>
                      <p>checkIn</p>
                      <span>{history.checkInDate.split("T")[0]}</span>
                    </div>
                    <div className={styles.inOutLine}></div>
                    <div className={styles.chOut}>
                      <p>checkOut</p>
                      <span>{history.checkOutDate.split("T")[0]}</span>
                    </div>
                  </div>
                  {/* view apartment button */}
                  <div className={styles.viewButton}>
                    {history.Apartment.CancellationPolicy.cancellationType !==
                    "NON_REFUNDABLE" ? (
                      history.bookingStatus === "CONFIRMED" ? (
                        <div style={{ width: "50%" }}>
                          <ModalButton
                            text="Cancel"
                            endpoint={`/v1/booking/${history.id}/cancel-booking`}
                            policy={
                              history.Apartment.CancellationPolicy
                                .cancellationType
                            }
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "red",
                          }}
                        >
                          {history.bookingStatus}
                        </div>
                      )
                    ) : (
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "red",
                        }}
                      >
                        No Refund
                      </div>
                    )}
                    <div style={{ width: "50%" }}>
                      <Button
                        text="View"
                        onClicks={`/${await locale}/apartments/${
                          history.Apartment.id
                        }`}
                        type={undefined}
                      />
                    </div>
                  </div>
                </li>
              </>
            ))}
        </ul>
      </section>
    </>
  );
}
