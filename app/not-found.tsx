"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import err from "@/public/error.svg";
import styles from "./notFound.module.css";

export default function NotFound() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
          gap: "25px",
          overflow: "hidden",
        }}
      >
        <Image
          style={{ width: "60%", height: "50%", margin: "0 auto" }}
          src={err}
          alt="Error404"
          width={200}
          height={200}
        />
        <div className={styles.button}>
          <Link
            className={styles.link}
            href="/"
            style={{ }}
          >
            Go back to the homepage
          </Link>
        </div>
      </div>
    </>
  );
}
