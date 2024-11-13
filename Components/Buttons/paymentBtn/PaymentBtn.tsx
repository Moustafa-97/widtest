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
  userVisa?: string;
}
interface CustomerData {
  name: string;
  email: string;
  street1: string;
  city: string;
  state: string;
  country: string;
  zip: string;
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
  const modalRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();

  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    street1: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  // const returnUrl = "https://widresidences.com";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("customerData", { ...customerData });

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
            returnUrl: "https://www.widresidences.com/en",
            token: userVisa,
            customerData: {
              ...customerData,
            },
          }),
        }
      );
      const res = await response.json();
      console.log("res", res);

      if (res.redirect_url) {

        console.log("Form submitted successfully", await res);
        window.location.href = res.redirect_url;
      } else {
        console.error("Form submission failed", await res);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleClick = async () => {
    setLoading(false);
    setShowModal(true);
  };

  // Close modal when clicking outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <>
      <>
        {token && token ? (
          <div>
            <button onClick={handleClick} className={styles.button}>
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
              <h2>Please insert the following</h2>
              {/* form */}
              <form className={styles.modalForm} onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={customerData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={customerData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="street1"
                  placeholder="Street"
                  value={customerData.street1}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={customerData.city}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={customerData.state}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={customerData.country}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="zip"
                  placeholder="Zip Code"
                  value={customerData.zip}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Submit</button>
              </form>
              {/* <p>{response.message}</p> */}
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

// const handleClick = async () => {
//   setLoading(false);
//   // setLoading(true);
//   // try {
//   // await fetch(`${process.env.NEXT_PUBLIC_BACKENDAPI}${endpoint2}`, {
//   //   method: "GET",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   // });

//   // const options: RequestInit = {
//   //   method,
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   //   },
//   // };

//   // if (method !== "GET" && data) {
//   // options.body = JSON.stringify(data);
//   // }

//   // const res = await fetch(
//   // `${process.env.NEXT_PUBLIC_BACKENDAPI}${endpoint1}`,
//   // options
//   // );

//   // if (!res.ok) {
//   //   throw new Error(`HTTP error! status: ${res.status}`);
//   // }

//   // const result = await res.json();
//   // if (result.redirect_url) {
//   // window.location.href = result.redirect_url;
//   // }
//   // setResponse(result);
//   setShowModal(true);
//   // } catch (error) {
//   // console.error("API request failed:", error);
//   // } finally {
//   // setLoading(false);
//   // }
// };

// /////////////////////////////////////////////////////////////

// "use client";
// import React, { useEffect } from "react";

// declare global {
//   interface Window {
//     Paytabs: any;
//   }
// }

// interface PaymentProps {
//   merchantEmail: string;
//   secretKey: string;
//   siteUrl: string;
//   returnUrl: string;
//   amount: number;
//   currency: string;
//   customerEmail: string;
//   customerPhone: string;
//   orderId: string;
//   productTitle: string;
//   productDescription: string;
// }

// const PaymentBtn: React.FC<PaymentProps> = ({
//   merchantEmail,
//   secretKey,
//   siteUrl,
//   returnUrl,
//   amount,
//   currency,
//   customerEmail,
//   customerPhone,
//   orderId,
//   productTitle,
// }) => {
//   useEffect(() => {
//     if (!window.Paytabs) {
//       console.log("PayTabs SDK not loaded");
//       return;
//     }
//   }, []);

//   const handlePayment = () => {
//     if (window.Paytabs) {
//       window.Paytabs.openPaymentPage({
//         merchant_email: merchantEmail,
//         secret_key: secretKey,
//         site_url: siteUrl,
//         return_url: returnUrl,
//         title: productTitle,
//         cc_first_name: "Customer",
//         cc_last_name: "Name",
//         cc_phone_number: customerPhone,
//         phone_number: customerPhone,
//         email: customerEmail,
//         products_per_title: productTitle,
//         unit_price: amount.toString(),
//         quantity: "1",
//         other_charges: "0",
//         amount: amount.toString(),
//         discount: "0",
//         currency,
//         reference_no: orderId,
//         ip_customer: "customer_ip",
//         ip_merchant: "merchant_ip",
//         billing_address: "123 Billing St",
//         city: "City",
//         state: "State",
//         postal_code: "12345",
//         country: "Country",
//         shipping_first_name: "Customer",
//         shipping_last_name: "Name",
//         address_shipping: "123 Shipping St",
//         state_shipping: "Shipping State",
//         city_shipping: "Shipping City",
//         postal_code_shipping: "12345",
//         country_shipping: "Shipping Country",
//         msg_lang: "en",
//         cms_with_version: "Next.js 13.4",
//       });
//     }
//   };

//   return (
//     <div>
//       <button onClick={handlePayment}>Pay Now</button>
//     </div>
//   );
// };

// export default PaymentBtn;
// //////////////////////////////////////////////////////////////

// "use client";
// import React, { useEffect, useState } from "react";

// declare global {
//   interface Window {
//     Paytabs: any;
//   }
// }
// interface PaymentProps {
//   merchantEmail: string;
//   secretKey: string;
//   siteUrl: string;
//   returnUrl: string;
//   amount: number;
//   currency: string;
//   customerEmail: string;
//   customerPhone: string;
//   orderId: string;
//   productTitle: string;
//   productDescription: string;
// }

// const PaymentBtn: React.FC<PaymentProps> = ({
//   merchantEmail,
//   secretKey,
//   siteUrl,
//   returnUrl,
//   amount,
//   currency,
//   customerEmail,
//   customerPhone,
//   orderId,
//   productTitle,
// }) => {
//   const [isPayTabsLoaded, setIsPayTabsLoaded] = useState(false);

//   useEffect(() => {
//     const loadPayTabsSDK = () => {
//       const script = document.createElement("script");
//       script.src = "https://secure-egypt.PayTabs.com/payment/js/paylib.js";
//       script.async = true;
//       script.onload = () => setIsPayTabsLoaded(true);
//       script.onerror = () => console.error("Failed to load PayTabs SDK");
//       document.body.appendChild(script);
//     };

//     if (!window.Paytabs) {
//       loadPayTabsSDK();
//     } else {
//       setIsPayTabsLoaded(true);
//     }
//   }, []);
//   const handlePayment = () => {
//     if (window.Paytabs && isPayTabsLoaded) {
//       window.Paytabs.openPaymentPage({
//         merchant_email: merchantEmail,
//         secret_key: secretKey,
//         site_url: siteUrl,
//         return_url: returnUrl,
//         title: productTitle,
//         cc_first_name: "Customer",
//         cc_last_name: "Name",
//         cc_phone_number: customerPhone,
//         phone_number: customerPhone,
//         email: customerEmail,
//         products_per_title: productTitle,
//         unit_price: amount.toString(),
//         quantity: "1",
//         other_charges: "0",
//         amount: amount.toString(),
//         discount: "0",
//         currency,
//         reference_no: orderId,
//         ip_customer: "customer_ip",
//         ip_merchant: "merchant_ip",
//         billing_address: "123 Billing St",
//         city: "City",
//         state: "State",
//         postal_code: "12345",
//         country: "Country",
//         shipping_first_name: "Customer",
//         shipping_last_name: "Name",
//         address_shipping: "123 Shipping St",
//         state_shipping: "Shipping State",
//         city_shipping: "Shipping City",
//         postal_code_shipping: "12345",
//         country_shipping: "Shipping Country",
//         msg_lang: "en",
//         cms_with_version: "Next.js 13.4",
//       });
//     } else {
//       console.error("PayTabs SDK is not loaded.");
//     }
//   };

//   return (
//     <div>
//       <button onClick={handlePayment} disabled={!isPayTabsLoaded}>
//         {isPayTabsLoaded ? "Pay Now" : "Loading..."}
//       </button>
//     </div>
//   );
// };

// export default PaymentBtn;
