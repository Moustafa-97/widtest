"use client";
import dynamic from "next/dynamic";
import React from "react";
import styles from "./appartment.module.css";
import "react-date-range/dist/styles.css"; // Date range picker styles
import "react-date-range/dist/theme/default.css"; // Date range theme
import { OrbitProgress } from "react-loading-indicators";
// import { cookies } from "next/headers";

// Dynamically load the ApartmentsPage component with no SSR
const ApartmentsPage = React.memo( dynamic(
  () => import("@/Components/searchPage/ApartmentsPage"),
  {
    ssr: false,
    loading: () => (
      <OrbitProgress variant="dotted" dense color={"#47b3c5"} size="large" />
    ),
  }
));

// Type definition for the searchParams prop
interface SearchParams {
  start_date?: string;
  end_date?: string;
  city?: string;
  district?: string;
}

export default function ApartmentPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { start_date, end_date, city, district } = searchParams || {};

  return (
    <>
      <section className={styles.apartmentSearchPage}>
        <ApartmentsPage
          start_date={start_date || ""}
          end_date={end_date || ""}
          city={city || ""}
          district={district || ""}
        />
      </section>
    </>
  );
}
