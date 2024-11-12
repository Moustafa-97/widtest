/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./visa.module.css";
import { SiVisa, SiMastercard } from "react-icons/si";

export default function Visa() {
  // const [select, setSelect] = useState(false);
  // const [selectedVisa, setSelectedVisa] = useState("Visa");
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
        {/* <form> */}
        {visaNumber?.map(
          (
            visa: { cardScheme: string; cardMask: string },
            index: { index: any }
          ) => (
            // <label
            //   key={index}
            //   // style={{
            //   //   backgroundColor:
            //   //     selectedVisa === visa.name
            //   //       ? "var(--green)"
            //   //       : "var(--background)",
            //   //   color:
            //   //     selectedVisa === visa.name
            //   //       ? "var(--background)"
            //   //       : "var(--notBlack)",
            //   // }}
            //   className={styles.visaForm}
            // >
            <div key={index.index} className={styles.visaDetails}>
              <span>
                {visa.cardScheme === "Visa" ? <SiVisa /> : <SiMastercard />}
              </span>
              <div className={styles.visaData}>
                <span className={styles.visaName}>{visa.cardMask}</span>
              </div>
            </div>
          )
        )}
        {/* </form> */}
      </div>
    </>
  );
}
