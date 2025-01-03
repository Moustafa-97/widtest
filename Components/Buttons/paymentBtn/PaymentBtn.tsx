/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./paymentBtn.module.css";
import { useTranslations } from "next-intl";
// import { useLocale } from "next-intl";
// import Link from "next/link";

interface ApiButtonProps {
  method: "POST" | "GET" | "DELETE";
  endpoint1: string;
  endpoint2: string;
  data?: any;
  text: string;
  width: string;
  token: string | any;
  locale: string | null;
  userVisa?: string | null;
}
interface CustomerBillingInfoResponse {
  CustomerBillingInfo: CustomerBillingInfo[];
}

interface CustomerBillingInfo {
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
}

interface CustomerData {
  name: string;
  email: string;
  street1: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phoneNumber?: string;
}
const PaymentBtn = ({
  endpoint1,
  endpoint2,
  text,
  token,
  userVisa,
}: ApiButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [save, setSave] = useState(false);

  // const [headerText, setHeaderText] = useState("Complete registration payment");

  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    street1: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const [address, setAddress] = useState<CustomerBillingInfoResponse>();
  const CustomerBillingInfo = address?.CustomerBillingInfo[0];

  useEffect(() => {
    if (CustomerBillingInfo) {
      setCustomerData({
        name: CustomerBillingInfo.name,
        email: CustomerBillingInfo.email,
        street1: CustomerBillingInfo.addressLine,
        city: CustomerBillingInfo.city,
        state: CustomerBillingInfo.state,
        country: CustomerBillingInfo.country,
        zip: CustomerBillingInfo.postalCode,
      });
    }
  }, [address]);
  // const locale = useLocale();
  useEffect(() => {
    const getUserBillingInfo = async () => {
      if (!token) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/user/get-billingInfo`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAddress(await response.json());
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getUserBillingInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  // if user accept
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/user/upsert-billingInfo`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: customerData.name ? customerData.name : "0",
            email: customerData.email ? customerData.email : "0",
            phoneNumber: customerData.phoneNumber
              ? customerData.phoneNumber
              : "0",
            addressLine: customerData.street1 ? customerData.street1 : "0",
            city: customerData.city ? customerData.city : "0",
            state: customerData.state ? customerData.state : "0",
            postalCode: customerData.zip ? customerData.zip : "0",
            country: customerData.country ? customerData.country : "0",
          }),
        }
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleOpenFormModal = async () => {
    setLoading(false);
    setShowModal(true);
  };

  // Close modal when clicking outside of it
  const handleClickOutsideModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutsideModal);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [showModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (token && userVisa === "Visa") {
      // setHeaderText("Please Select a Card");
      // return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}${endpoint2}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              customerData: {
                ...customerData,
              },
            }),
          }
        );
        const res = await response.json();

        if (res.redirect_url) {
          window.location.href = res.redirect_url;
        } else {
          console.error("Form submission failed", await res);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
    if (save) {
      handleSaveAddress(e);
    }
    if (userVisa === "Visa" && !token) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}${endpoint2}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              customerData: {
                ...customerData,
              },
            }),
          }
        );
        const res = await response.json();

        if (res.redirect_url) {
          window.location.href = res.redirect_url;
        } else {
          console.error("Form submission failed", await res);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}${endpoint1}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            token: userVisa === "Visa" ? "" : userVisa,
            customerData: {
              ...customerData,
            },
          }),
        }
      );
      const res = await response.json();

      if (res.redirect_url) {
        window.location.href = res.redirect_url;
      } else {
        console.error("Form submission failed", await res);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const t = useTranslations("payment");
  return (
    <>
      <>
        {/* {token && token ? ( */}
        <div>
          <button
            onClick={handleOpenFormModal}
            style={{ height: "48px" }}
            className={styles.button}
          >
            {loading ? "..." : `${text}`}
          </button>
        </div>
        {/* ) : (
          <div>
            <Link
              href={`/${locale}/login`}
              className={`${styles.button} ${styles.linkButton} `}
            >
              Login
            </Link>
          </div>
        )} */}
        {/* Modal */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} ref={modalRef}>
              <h2
              // style={
              //   headerText === "Please Select a Card" ? { color: "red" } : {}
              // }
              >
                {/* {headerText} */}
                {t("completePayment")}
              </h2>
              <h3>{t("personalDetails")}</h3>

              <form className={styles.modalForm} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.inputSection}>
                    <label htmlFor="name">{t("name")}</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder={
                        !CustomerBillingInfo ? t("name") : customerData.name
                      }
                      value={customerData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.inputSection}>
                    <label htmlFor="email">{t("email")}</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder={
                        !CustomerBillingInfo ? t("email") : customerData.email
                      }
                      value={customerData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputSection}>
                    <label htmlFor="street">{t("street")}</label>
                    <input
                      id="street"
                      type="text"
                      name="street1"
                      placeholder={
                        !CustomerBillingInfo
                          ? t("street")
                          : customerData.street1
                      }
                      value={customerData.street1}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.inputSection}>
                    <label htmlFor="city">{t("city")}</label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      placeholder={
                        !CustomerBillingInfo ? t("city") : customerData.city
                      }
                      value={customerData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputSection}>
                    <label htmlFor="state">{t("state")}</label>
                    <input
                      id="state"
                      type="text"
                      name="state"
                      placeholder={
                        !CustomerBillingInfo ? t("state") : customerData.state
                      }
                      value={customerData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.inputSection}>
                    <label htmlFor="country">{t("country")}</label>
                    <input
                      id="country"
                      type="text"
                      name="country"
                      placeholder={
                        !CustomerBillingInfo
                          ? t("country")
                          : customerData.country
                      }
                      value={customerData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.inputSection}>
                    <label htmlFor="zip">{t("zip")}</label>
                    <input
                      id="zip"
                      type="text"
                      name="zip"
                      placeholder={
                        !CustomerBillingInfo ? t("zip") : customerData.zip
                      }
                      value={customerData.zip}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {token && (
                    <div className={styles.inputSection}>
                      <div className={styles.radioSection}>
                        <label htmlFor="save">{t("save")}</label>
                        <input
                          type="radio"
                          value="no"
                          id="save"
                          checked={save}
                          unselectable="on"
                          onClick={() => setSave(!save)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <button className={styles.button} type="submit">
                  {t("submit")}
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default PaymentBtn;
