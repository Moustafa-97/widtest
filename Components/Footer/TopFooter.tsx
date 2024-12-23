"use client";
import React from "react";
import styles from "./topfooter.module.css";
// import prototype from "./footerbg.svg";
// import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import Link from "next/link";
export default function TopFooter() {
  return (
    <>
      <main dir="ltr" className={styles.container}>
        <div className={`${styles.subContainer}`}>
          <section className={styles.topSection}>
            <div className={styles.textContainer}>
              <h2>Ready To Get Started?</h2>
              <p>
                Download the app to book your next stay with ease. Explore,
                compare, and reserve—all at your fingertips.
              </p>
            </div>
          </section>
          <section className={styles.bottomSection}>
            <div className={styles.buttons}>
              <Link href="#" className={styles.googlePlay}>
                <div className={styles.getLogo}>
                  <FaGooglePlay />
                </div>
                <div className={styles.getText}>
                  <span className={styles.getOn}>Get it on</span>{" "}
                  <span className={styles.getStore}>Google Play</span>
                </div>
              </Link>
              <Link href="#" className={styles.appStore}>
                <div className={styles.getLogo}>
                  <FaApple />
                </div>
                <div className={styles.getText}>
                  <span className={styles.getOn}>Get it on</span>{" "}
                  <span className={styles.getStore}>App Store</span>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
