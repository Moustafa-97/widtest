/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./profileBtn.module.css";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

interface Props {
  onClicks: string;
  type: "submit" | "button" | "reset" | undefined;
  text: string | any;
  response: any;
  token: string | null;
}

export default function ProfileBtn(props: Props) {
  const profile = props.response;
  const t = useTranslations("Header");
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    localStorage.removeItem("token");
    document.location.reload();
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div onClick={handleClick} className={styles.button}>
        <Image
          src={profile.profilePicture}
          alt="profile picture"
          width={40}
          height={40}
          loading="lazy"
          placeholder="empty"
        />
        <p>{profile.firstName.slice(0, 3)}.</p>
      </div>
      {isOpen && (
        <div
          dir="rtl"
          ref={profileRef}
          className={`${styles.dropdown} ${
            locale === "ar" ? styles.left : styles.right
          }`}
        >
          <ul>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href={`/${locale}/profile`}
              >
                {t("account")}
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href={`/${locale}/profile?history=History`}
              >
                {t("payment")}
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                href={`/${locale}`}
              >
                {t("LOGOUT")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
