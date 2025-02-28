"use client";
import Image from "next/image";
import styles from "./footer.module.css";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import logoFooter from "./logo.svg";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import Link from "next/link";
import React from "react";
import TopFooter from "./TopFooter";
import { useLocale, useTranslations } from "next-intl";
export default function MobileAppFooter() {
  return (
    <>
      <section className={styles.allFooter}>
        <div className={styles.topFooter}>
          <TopFooter />
        </div>

        <div className={styles.bottomFooter}>
          <Footer />
        </div>
      </section>
    </>
  );
}

function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  return (
    <>
      <footer className={styles.footer}>
        {/* top */}
        {/* <div className={styles.footerTop}>
          <TopFooter />
        </div> */}
        {/* <div className={styles.footerBottom}> */}
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Image
              src={logoFooter}
              alt="Mobile App Logo"
              className={styles.logoF}
            />
          </div>
          <p>
            {t("text")}
          </p>
        </div>
        <div className={styles.footerCompanyLinks}>
          <h4>{t("company")}</h4>
          <ul>
            <li>
              <Link href={`/${locale}/about`}>{t("about")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/apartments`}>{t("apartments")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/contact`}>{t("contact")}</Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerKnowLinks}>
          <h4>{t("know")}</h4>
          <ul>
            <li>
              <Link href={`/${locale}/terms`}>{t("terms")}</Link>
            </li>
            <li>
              <Link style={{textWrap:"nowrap"}} href={`/${locale}/privacyAndPolicy`}>{t("privacy")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/FAQs`}>{t("faq")}</Link>
            </li>
          </ul>
        </div>
        {/* </section> */}

        {/* bottom */}

        <div className={styles.follow}>
          <p>{t("follow")}</p>
          <div className={styles.followIcons}>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaYoutube />
            </a>
            <a href="#">
              <FaFacebook />
            </a>
          </div>
        </div>
        <div className={styles.copyRights}>
          <p>© 2024 {t("rights")}</p>
        </div>
        <div className={styles.contactInfo}>
          <p>
            <span>
              <FaPhone />{" "}
            </span>
            647 973 6967 |{" "}
            <span>
              <TbDeviceLandlinePhone />{" "}
            </span>{" "}
            416 454 6536 | @ hello@gmail.com
          </p>
        </div>
        {/* </div> */}
        {/* </section> */}
      </footer>
    </>
  );
}
