"use client";
import Image from "next/image";
import React from "react";
import err from "@/public/error.svg";
import Link from "next/link";

function Error() {
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
        <Link
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
            width: "60%",
            backgroundColor: "var(--green)",
          }}
        >
          Go back to the homepage
        </Link>
      </div>
    </>
  );
}

export default Error;
