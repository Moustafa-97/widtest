"use client";
import React from "react";
import styles from "./NoSearch.module.css";
import { useTranslations } from "next-intl";

export default function NoSearch() {
  const t = useTranslations("serachError");
  return (
    <div className={styles.container}>
      <div className={styles.icon}>🔎</div>
      <h2 className={styles.message}>{t("search")}</h2>
    </div>
  );
}
