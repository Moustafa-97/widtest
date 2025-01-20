/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import styles from "./apiButton.module.css";
import { useLocale } from "next-intl";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface ApiButtonProps {
  method: "POST" | "GET" | "DELETE";
  endpoint: string;
  data?: any;
  icon: React.ReactNode;
  id?: string | number;
  token?: string;
}

const ApiButton = ({ method, endpoint, icon, id }: ApiButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [wished, setWished] = useState<{ id: string }[]>();
  const locale = useLocale();
  const token = localStorage.getItem("token");
  const notify = (message: string) =>
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  useEffect(() => {
    if (!token) {
      return;
    }
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/wishlist/get-wishlist?local=${locale}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setWished(res.data);
      })
      .catch((err) => console.log(err));
  }, [response]);

  const handleClick = async () => {
    if (!token) {
      notify("Please login first");
      return;
    }
    setLoading(true);

    try {
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKENDAPI}${endpoint}`, {
          method,
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })
        .then((res) => {
          setResponse(res.data);
          notify("added");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("API request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`${styles.favorite} ${
          response !== null ? styles.added : ""
        } ${
          wished?.find((apartment) => apartment.id === id) ? styles.added : ""
        }`}
        onClick={handleClick}
      >
        {loading ? "..." : icon}
      </div>
    </>
  );
};

export default ApiButton;
