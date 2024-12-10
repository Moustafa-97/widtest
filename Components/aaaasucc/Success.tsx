/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import success from "./success.svg";
import { useRouter } from "next/navigation";
import styles from "./success.module.css";

const PaymentReturn = ({
  bookingId,
  paidWithSavedCard,
  data,
}: {
  bookingId?: string;
  paidWithSavedCard?: string;
  data: {
    acquirerMessage?: string;
    acquirerRRN?: string;
    cartId?: string;
    customerEmail?: string;
    respCode?: string;
    respMessage?: string;
    respStatus?: string;
    signature?: string;
    token?: string;
    tranRef?: string;
  };
}) => {
  console.log("decodedParams", data);
  console.log("bookingId", bookingId);
  console.log("paidWithSavedCard", paidWithSavedCard);
  const token = localStorage.getItem("token");
  const router = useRouter();
  const handleGoBackHome = () => {
    router.push("/");
  };
  const handleSaveCard = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/booking/user/save-card-web`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            token: data.token,
          }),
        }
      );
      console.log("card saved");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Success</h1>
          <Image
            className={styles.image}
            src={success}
            alt="success"
            width={1000}
            height={1000}
          />
        </div>
        <div className={styles.buttonContainer}>
          {token && paidWithSavedCard === "false" && (
            <button className={styles.button} onClick={handleSaveCard}>
              Save Card
            </button>
          )}
          <button className={styles.button} onClick={handleGoBackHome}>
            Go back to the homepage
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentReturn;
