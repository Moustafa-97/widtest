"use client";
import React from "react";
import styles from "./aboutUs.module.css";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import threePic from "@/public/HomePage/homePageMulti.png";
function AboutUs() {
  const t = useTranslations("aboutHome");
  return (
    <>
      <div className={styles.container}>
        {/* title */}
        <div className={styles.title}>
          <div className={styles.sideLine}></div>
          <h5>{t("title")}</h5>
        </div>
        {/* header */}
        <div className={styles.header}>
          <p>
            {t("descriptionBlack")}
            <span>{t("descriptionGreen")}</span>
          </p>
        </div>

        {/* btn */}
        <div className={styles.btn}>
          <Link href="/about">{t("title")}</Link>
        </div>
        {/* mini text */}
        <div className={styles.miniText}>
          <p>{t("miniText")}</p>
        </div>
        {/* image */}
        <div className={styles.image}>
          <Image src={threePic} alt="about us" width={1000} height={1000} />
        </div>
      </div>
    </>
  );
}

export default AboutUs;
