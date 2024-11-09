/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styles from "./syggested.module.css";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import dynamic from "next/dynamic";
import { FaBed, FaBroom } from "react-icons/fa";
import { FaRestroom } from "react-icons/fa6";
const Carousel = dynamic(() => import("@/Components/Carousel/Carousel"), {
  ssr: false,
});

import LikeBtn from "./likeBtn/LikeBtn";

// Define the TypeScript type for the offer data structure
type ApartmentOffer = {
  id: number;
  name: string;
  nightlyPrice: number;
  ApartmentAddress: {
    District: {
      name: string;
      City: {
        name: string;
      };
    };
  };
  ApartmentDetails: {
    numberOfBedrooms: number;
    numberOfBeds: number;
    numberOfBathrooms: number;
    numberOfBedRooms: number;
    numberOfGuests: number | null;
  };
  ApartmentImage: string;
  avgRating: number;
  reviewCount: number;
};

async function fetchOffers(locale: "en" | "ar"): Promise<ApartmentOffer[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/home/most-visited-apartments?limit=8&page=1&locale=${locale}`
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
}

export default async function Suggested() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const locale: "en" | "ar" | any = getLocale();

  const offers = await fetchOffers(await locale);

  const awaitLocale = await locale;
  // Render cards
  const cards = () => {
    return offers.map((item) => (
      <div
        key={item.id}
        className={styles.card}
      >
        <div className={styles.imageContainer}>
          <Image
            src={item.ApartmentImage}
            alt={item.name}
            width={1000}
            height={1000}
            className={styles.apartmentImage}            
            priority

          />
          <div className={styles.likeButton}>
            <LikeBtn
              method={"POST"}
              endpoint={`/v1/wishlist/toggle-wish/${item.id}`}
              id={item?.id}
            />
          </div>
        </div>
        <Link
          href={`${awaitLocale}/apartments/${item.id}`}
          className={styles.details}
        >
          <h3 className={styles.name}>{item.name}</h3>
          <p className={styles.address}>
            {item.ApartmentAddress.District.name},{" "}
            {item.ApartmentAddress.District.City.name}
          </p>

          <div className={styles.rating}>
            <div className={styles.supply}>
              <FaBed /> <span>{item.ApartmentDetails.numberOfBeds}</span>
            </div>
            <div className={styles.supply}>
              <FaBroom /> <span>{item.ApartmentDetails.numberOfBedRooms}</span>
            </div>
            <div className={styles.supply}>
              <FaRestroom />{" "}
              <span>{item.ApartmentDetails.numberOfBathrooms}</span>
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <>
      <Carousel isFor="suggest" cards={cards()} />
    </>
  );
}
// "use client";
// import React, { useEffect, useState } from "react";
// import styles from "./syggested.module.css";
// import Image from "next/image";
// import { Link } from "@/i18n/routing";
// import dynamic from "next/dynamic";
// import { FaBed, FaBroom } from "react-icons/fa";
// import { FaRestroom } from "react-icons/fa6";
// import liked from "./liked.svg";
// import unliked from "./unliked.svg";
// import { useLocale } from "next-intl";

// // Dynamically import the Carousel component without SSR
// const Carousel = dynamic(() => import("@/Components/Carousel/Carousel"), {
//   ssr: false,
// });

// // Define the TypeScript type for the offer data structure
// type ApartmentOffer = {
//   id: number;
//   name: string;
//   nightlyPrice: number;
//   ApartmentAddress: {
//     District: {
//       name: string;
//       City: {
//         name: string;
//       };
//     };
//   };
//   ApartmentDetails: {
//     numberOfBedrooms: number;
//     numberOfBeds: number;
//     numberOfBathrooms: number;
//     numberOfBedRooms: number;
//     numberOfGuests: number | null;
//   };
//   ApartmentImage: string;
//   avgRating: number;
//   reviewCount: number;
// };

// export default function Suggested() {
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState<any>(null);
//   const [offers, setOffers] = useState<ApartmentOffer[]>([]);
//   const locale = useLocale();

//   useEffect(() => {
//     const fetchOffers = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/home/most-visited-apartments?limit=8&page=1&locale=${locale}`
//         );
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }
//         const data = await response.json();
//         setOffers(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     if (locale) {
//       fetchOffers();
//     }
//   }, [locale]);

//   const [wished, setWished] = useState<{ id: string }[]>();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       return;
//     }
//     const res = fetch(
//       `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/wishlist/get-wishlist?local=${locale}`,

//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     res
//       .then((res) => res.json())
//       .then((data) => {
//         setWished(data);
//       });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [response]);

//   const handleClick = async (method: string, endpoint: string, data: any) => {
//     if (!token) {
//       return;
//     }
//     setLoading(true);

//     try {
//       const options: RequestInit = {
//         method,
//         headers: {
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       };

//       // Only include body for POST and DELETE requests
//       if (method !== "GET" && data) {
//         options.body = JSON.stringify(data);
//       }

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKENDAPI}${endpoint}`,
//         options
//       );

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const result = await res.json();
//       setResponse(result);
//       console.log("API response:", result);
//     } catch (error) {
//       console.error("API request failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Render cards
//   const cards = () => {
//     return offers.map((item) => (
//       <Link
//         href={`${locale}/apartments/${item.id}`}
//         key={item.id}
//         className={styles.card}
//       >
//         <div className={styles.imageContainer}>
//           <div className={styles.apartmentImage}>
//             <Image
//               src={item.ApartmentImage}
//               alt={item.name}
//               width={1000}
//               height={1000}
//               className={styles.AapartmentImage}
//             />
//           </div>
//           <div className={styles.likeButton}>
//             <button
//               onClick={() =>
//                 handleClick("POST", `/v1/wishlist/toggle-wish/${item.id}`, {})
//               }
//             >
//               {wished ? (
//                 <Image src={liked} alt="like" width={100} height={100} />
//               ) : (
//                 <Image src={unliked} alt="like" width={100} height={100} />
//               )}
//             </button>
//           </div>
//         </div>
//         <div className={styles.details}>
//           <h3 className={styles.name}>{item.name}</h3>
//           <p className={styles.address}>
//             {item.ApartmentAddress.District.name},{" "}
//             {item.ApartmentAddress.District.City.name}
//           </p>
//           <div className={styles.rating}>
//             <div className={styles.supply}>
//               <FaBed /> <span>{item.ApartmentDetails.numberOfBeds}</span>
//             </div>
//             <div className={styles.supply}>
//               <FaBroom /> <span>{item.ApartmentDetails.numberOfBedRooms}</span>
//             </div>
//             <div className={styles.supply}>
//               <FaRestroom />{" "}
//               <span>{item.ApartmentDetails.numberOfBathrooms}</span>
//             </div>
//           </div>
//         </div>
//       </Link>
//     ));
//   };

//   return (
//     <>
//       <Carousel isFor="suggest" cards={cards()} />
//     </>
//   );
// }
