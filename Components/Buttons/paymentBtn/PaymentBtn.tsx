/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./paymentBtn.module.css";
import { useLocale } from "next-intl";
import Link from "next/link";

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
  // method,
  endpoint1,
  // endpoint2,
  // data,
  text,
  token,
  userVisa,
}: ApiButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [headerText, setHeaderText] = useState("Please Insert Fields");
  const modalRef = useRef<HTMLDivElement>(null);
  const modalSaveRef = useRef<HTMLDivElement>(null);

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
  const locale = useLocale();
  useEffect(() => {
    const getUserBillingInfo = async () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userVisa === "Visa") {
      setHeaderText("Please Select a Card");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}${endpoint1}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            returnUrl: "https://www.widresidences.com",
            token: userVisa,
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
      setShowSaveModal(false);
      handleSubmit(e);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  // if user refuse
  const handleRefuseAddress = (e: React.FormEvent) => {
    setShowSaveModal(false);
    handleSubmit(e);
  };
  // modals handling
  const handleOpenFormModal = async () => {
    setLoading(false);
    setShowModal(true);
  };
  const handleOpenSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSaveModal(true);
  };

  // Close modal when clicking outside of it
  const handleClickOutsideModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };
  const handleClickOutsideSaveModal = (event: MouseEvent) => {
    if (
      modalSaveRef.current &&
      !modalSaveRef.current.contains(event.target as Node)
    ) {
      setShowSaveModal(false);
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
  useEffect(() => {
    if (showSaveModal) {
      document.addEventListener("mousedown", handleClickOutsideSaveModal);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideSaveModal);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSaveModal);
    };
  }, [showSaveModal]);

  return (
    <>
      <>
        {token && token ? (
          <div>
            <button onClick={handleOpenFormModal} className={styles.button}>
              {loading ? "..." : `${text}`}
            </button>
          </div>
        ) : (
          <div>
            <Link
              href={`/${locale}/login`}
              className={`${styles.button} ${styles.linkButton} `}
            >
              Login
            </Link>
          </div>
        )}
        {/* Modal */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} ref={modalRef}>
              <h2
                style={
                  headerText === "Please Select a Card" ? { color: "red" } : {}
                }
              >
                {headerText}
              </h2>

              <form
                className={styles.modalForm}
                onSubmit={
                  CustomerBillingInfo ? handleSubmit : handleOpenSaveModal
                }
              >
                <input
                  type="text"
                  name="name"
                  placeholder={
                    !CustomerBillingInfo ? "Name" : customerData.name
                  }
                  value={customerData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={
                    !CustomerBillingInfo ? "Email" : customerData.email
                  }
                  value={customerData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="street1"
                  placeholder={
                    !CustomerBillingInfo ? "Street" : customerData.street1
                  }
                  value={customerData.street1}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder={
                    !CustomerBillingInfo ? "City" : customerData.city
                  }
                  value={customerData.city}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder={
                    !CustomerBillingInfo ? "State" : customerData.state
                  }
                  value={customerData.state}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder={
                    !CustomerBillingInfo ? "Country" : customerData.country
                  }
                  value={customerData.country}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="zip"
                  placeholder={
                    !CustomerBillingInfo ? "Zip code" : customerData.zip
                  }
                  value={customerData.zip}
                  onChange={handleChange}
                  required
                />
                <button className={styles.button} type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
        {showSaveModal && (
          <div className={styles.modalSaveOverlay}>
            <div className={styles.modal} ref={modalSaveRef}>
              <h2>Do you want to save your information</h2>
              <div className={styles.modalSaveBtns}>
                <button
                  className={styles.button}
                  onClick={(e) => {
                    handleSaveAddress(e);
                  }}
                >
                  yes
                </button>
                <button
                  className={styles.button}
                  onClick={(e) => {
                    handleRefuseAddress(e);
                  }}
                >
                  no
                </button>
              </div>
            </div>
          </div>
        )}
      </>
      {/* ) : (
        <div>
          <Link href={`/${locale}/login`} className={styles.link}>
            <p>Please Login</p>
          </Link>
        </div>
      )} */}
    </>
  );
};

export default PaymentBtn;
