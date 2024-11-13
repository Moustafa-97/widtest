/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./visa.module.css";
import { SiVisa, SiMastercard } from "react-icons/si";

interface ChildComponentProps {
  setUserVisa: React.Dispatch<React.SetStateAction<string>> | any;
}
export default function Visa({ setUserVisa }: ChildComponentProps) {
  // const [select, setSelect] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState("Visa");
  setUserVisa(selectedVisa);
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

  const handleVisaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedVisa(event.target.value);
    setUserVisa(event.target.value);
  };

  return (
    <>
      <div className={styles.visa}>
        <form>
          {visaNumber?.map(
            (visa: {
              cardScheme: string;
              cardMask: string;
              cardToken: string;
            }) => (
              <label
                key={Math.random()}
                style={{
                  backgroundColor:
                    selectedVisa === visa.cardToken
                      ? "var(--green)"
                      : "var(--background)",
                  color:
                    selectedVisa === visa.cardToken
                      ? "var(--background)"
                      : "var(--notBlack)",
                }}
                className={styles.visaForm}
              >
                <div key={Math.random()} className={styles.visaDetails}>
                  <span>
                    {visa.cardScheme === "Visa" ? <SiVisa /> : <SiMastercard />}
                  </span>
                  <div className={styles.visaData}>
                    <span className={styles.visaName}>{visa.cardMask}</span>
                  </div>
                </div>

                <input
                  type="radio"
                  name="visa"
                  value={visa.cardToken}
                  checked={selectedVisa === visa.cardToken}
                  onChange={handleVisaChange}
                  style={{
                    accentColor:
                      selectedVisa === visa.cardMask
                        ? "var(--background)"
                        : "var(--notBlack)",
                  }}
                />
              </label>
            )
          )}
        </form>
      </div>
    </>
  );
}
