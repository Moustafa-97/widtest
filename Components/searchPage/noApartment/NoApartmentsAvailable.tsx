"use client";
import React from "react";
import styles from "./NoApartmentsAvailable.module.css";
import { useTranslations } from "next-intl";

export default function NoApartmentsAvailable() {
  const t = useTranslations("searchError");
  return (
    <div className={styles.container}>
      <div className={styles.icon}>🏢</div>
      <h2 className={styles.message}>{t("noApart")}</h2>
      <p className={styles.subtext}>{t("tryAgain")}</p>
      <button
        className={styles.retryButton}
        onClick={() => window.location.reload()}
      >
        {t("tryAgainbtn")}
      </button>
    </div>
  );
}
