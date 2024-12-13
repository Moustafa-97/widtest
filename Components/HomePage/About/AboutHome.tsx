"use client";
import React from "react";
import Image from "next/image";
import styles from "./about.module.css";
import { useLocale, useTranslations } from "next-intl";
import aboutImage from "@/public/HomePage/homePageMulti.png";
import Link from "next/link";

export default function AboutHome() {
  const locale = useLocale();

  const t = useTranslations("aboutHome");
  return (
    <>
      {/* About Us Section */}
      <div className={styles.AboutUs}>
        <p className={styles.Textheader}>{t("title")}</p>
        <p className={styles.AboutUsTextbody}>
          {t("descriptionBlack")}
          <span className={styles.AboutUsTextbodySpan}>
            {t("descriptionGreen")}
          </span>
        </p>
        <div className={styles.AboutUsBtn}>
          <Link href={`${locale}/about`} className={styles.AboutUsLink}>{t("title")}</Link>
        </div>
        <div className={styles.AboutUsImg}>
          <Image
            width={1000}
            height={1000}
            src={aboutImage}
            alt="about us"
            loading="eager"
            placeholder="blur"
          />
        </div>
      </div>
    </>
  );
}
