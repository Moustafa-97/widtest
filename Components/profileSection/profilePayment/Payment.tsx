/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { SiMastercard, SiVisa } from "react-icons/si";
import styles from "./payment.module.css";

export default function Payment() {
  const [visaNumber, setVisaNumber] = useState<any>([]);

  const token = localStorage.getItem("token");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/booking//user/get-saved-cards`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setVisaNumber(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className={styles.visa}>
        <div className={styles.visaCard}>
          {visaNumber ? (
            visaNumber?.map(
              (visa: {
                cardScheme: string;
                cardMask: string;
                cardToken: string;
              }) => (
                <div key={Math.random()} className={styles.visaDetails}>
                  <div className={styles.visaData}>
                    <span className={styles.visaName}>{visa.cardMask}</span>
                  </div>
                  <span>
                    {visa.cardScheme === "Visa" ? <SiVisa /> : <SiMastercard />}
                  </span>
                </div>
              )
            )
          ) : (
            <div className={styles.visaAdd}>add visa</div>
          )}
        </div>
      </div>
    </>
  );
}
