"use client"
// import { cookies } from "next/headers";
import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import styles from "./profilePage.module.css";

const ProfileMain = dynamic(
  () => import("@/Components/profileSection/profileMain/ProfileMain"),
  { ssr: false }
);
const ProfileHeader = dynamic(
  () => import("@/Components/profileSection/profileTopSection/ProfileHeader"),
  { ssr: false }
);
type Data = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};
export default async function profilePage() {
  // const cookiez = await cookies();
  // const token = await cookiez.get("jwt")?.value;
  const token = localStorage.getItem("token");
  const getProfileData = async () => {
    if (!token) return null;
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/user/get-profileInfo`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  };
  const profileData: Data = await getProfileData();

  return (
    <>
      <section
        style={{ minHeight: "100vh" }}
        className={styles.profileContainer}
      >
        {profileData && (
          <>
            <ProfileHeader profile={profileData} />
            <ProfileMain />
          </>
        )}
      </section>
    </>
  );
}
