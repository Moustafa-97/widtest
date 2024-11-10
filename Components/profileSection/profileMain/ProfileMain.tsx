/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./profileMain.module.css";
import axios from "axios";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const Account = dynamic(() => import("../profileAccount/Account"), {
  ssr: false,
});
const History = dynamic(() => import("../profileHistory/History"), {
  ssr: false,
});
const Payment = dynamic(() => import("../profilePayment/Payment"), {
  ssr: false,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProfileMain() {
  const searchParams = useSearchParams();
  const history = searchParams.get("history");
  const locale = useLocale();
  const [selected, setSelected] = useState(history ? history : "Profile");
  const profileSections = ["Profile", "History", "Payment Methods"];
  const [profileData, setProfileData] = useState({});
  const [profileHistory, setProfileHistory] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/user/get-profileInfo`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsLogged(true);
            setProfileData(response.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  //   history
  useEffect(() => {
    if (isLogged && token) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/user/get-bookings-history?locale=${locale}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setIsLogged(true);
            setProfileHistory(response.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <section className={styles.profileNav}>
        {/* top */}
        <div className={styles.profileHeader}>
          <ul>
            {profileSections.map((section, index) => (
              <li
                onClick={() => setSelected(section)}
                key={index}
                className={`${selected === section ? styles.active : ""} ${
                  styles.list
                }`}
              >
                <p>{section}</p>
              </li>
            ))}
          </ul>
        </div>
        {/* body */}
        <div className={styles.profilePartition}>
          {selected === "Profile" && (
            <Account account={profileData} token={token} />
          )}
          {selected === "Payment Methods" && <Payment />}
          {selected === "History" && (
            <History history={profileHistory} token={token as string} />
          )}
        </div>
      </section>
    </>
  );
}
