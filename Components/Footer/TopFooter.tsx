"use client";
import React from "react";
import styles from "./topfooter.module.css";
// import prototype from "./footerbg.svg";
// import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import Link from "next/link";
export default function TopFooter() {
  const t = useTranslations("Footer");
  return (
    <>
      <main dir="ltr" className={styles.container}>
        <div className={`${styles.subContainer}`}>
          <section className={styles.topSection}>
            <div className={styles.textContainer}>
              <h2>{t("ready")}</h2>
              <p>{t("readyText")}</p>
            </div>
          </section>
          <section className={styles.bottomSection}>
            <div className={styles.buttons}>
              <Link href="#" className={styles.googlePlay}>
                <div className={styles.getLogo}>
                  <FaGooglePlay />
                </div>
                <div className={styles.getText}>
                  <span className={styles.getOn}>{t("getPlay")}</span>{" "}
                  <span className={styles.getStore}>{t("googlePlay")}</span>
                </div>
              </Link>
              <Link href="#" className={styles.appStore}>
                <div className={styles.getLogo}>
                  <FaApple />
                </div>
                <div className={styles.getText}>
                  <span className={styles.getOn}>{t("getPlay")}</span>{" "}
                  <span className={styles.getStore}>{t("appStore")}</span>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
