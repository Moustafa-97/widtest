/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PaymentReturn from "@/Components/aaaasucc/Success";
import React from "react";

type SearchParamsString = {
  searchParams: {
    bookingId?: string;
    paidWithSavedCard?: string;
    data?: string;
  };
};

function successPage(searchParams: SearchParamsString) {
  const { bookingId, paidWithSavedCard } = searchParams.searchParams;
  function decodeQueryParams(url: string | any) {
    // Extract 'data' from the URL query string
    const urlParams = new URLSearchParams(url);
    const encodedData = urlParams.get("data");

    if (encodedData) {
      // Decode the URL-encoded string
      const decodedData = decodeURIComponent(encodedData);

      // Parse the decoded string as JSON
      try {
        const parsedData = JSON.parse(decodedData);
        return parsedData;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
      }
    }
    return null;
  }

  const decodedData = decodeQueryParams(searchParams.searchParams);

  return (
    <>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "775px",
          width: "100%",
          gap: "25px",
          overflow: "hidden",
        }}
      >
        <PaymentReturn
          bookingId={bookingId}
          paidWithSavedCard={paidWithSavedCard}
          data={decodedData}
        />
      </section>
    </>
  );
}

export default successPage;
