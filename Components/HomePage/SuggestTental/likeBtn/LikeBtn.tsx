/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import styles from "./likeBtn.module.css";
import { useLocale } from "next-intl";
import Image from "next/image";
import liked from "../liked.svg";
import unliked from "../unliked.svg";

interface ApiButtonProps {
  method: "POST" | "GET" | "DELETE";
  endpoint: string;
  data?: any;
  //   icon: React.ReactNode;
  id?: string | number;
  token?: string;
}

const LikeBtn = ({
  method,
  endpoint,
  data,
  //   icon,
  id,
}: // token,
ApiButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [wished, setWished] = useState<{ id: string }[]>();
  const locale = useLocale();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return;
    }
    const res = fetch(
      `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/wishlist/get-wishlist?local=${locale}`,

      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res
      .then((res) => res.json())
      .then((data) => {
        setWished(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleClick = async () => {
    if (!token) {
      return;
    }
    setLoading(true);

    try {
      const options: RequestInit = {
        method,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };

      // Only include body for POST and DELETE requests
      if (method !== "GET" && data) {
        options.body = JSON.stringify(data);
      }

      // Making the request to the external API using the endpoint
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}${endpoint}`,
        options
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      setResponse(result);
      console.log("API response:", result);
    } catch (error) {
      console.error("API request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`${styles.favorite} `} onClick={handleClick}>
        {loading && wished?.find((apartment) => apartment.id === id) ? (
          <Image src={liked} alt="like" width={100} height={100} />
        ) : response ? (
          <Image src={liked} alt="like" width={100} height={100} />
        ) : (
          <Image src={unliked} alt="like" width={100} height={100} />
        )}
      </div>
    </>
  );
};

export default LikeBtn;
