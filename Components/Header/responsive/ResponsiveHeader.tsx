/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./responsiveHeader.module.css";
import Link from "next/link";
import Button from "@/Components/Buttons/Button";
// import ar from "../ar.svg";
// import en from "../en.svg";
import logo from "../logo.svg";
import Image from "next/image";
import homeIcon from "@/public/navbar/home.svg";
import aboutIcon from "@/public/navbar/about.svg";
import apartmentIcon from "@/public/navbar/apartments.svg";
import contactIcon from "@/public/navbar/contact.svg";
import profileIcon from "@/public/navbar/profile.svg";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ResponsiveHeader = ({
  pathname,
  searchParams,
  locale,
  isLogged,
  t,
}:
  | {
      cookies: string | any;
      pathname: string;
      searchParams: string;
      locale: string;
      isLogged: boolean;
      t: any;
      navBar1: {
        name: string;
        href: string;
      }[];
      response: {
        firstName: string | any;
      };
    }
  | any) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideMenu = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navbarElements = [
    {
      name: t("HOME"),
      href: "/",
      icon: <Image src={homeIcon} alt="home icon" width={20} height={20} />,
    },
    {
      name: t("ABOUT"),
      href: `/${locale}/about`,
      icon: <Image src={aboutIcon} alt="home icon" width={20} height={20} />,
    },
    {
      name: t("APARTMENTS"),
      href: `/${locale}/apartments`,
      icon: (
        <Image src={apartmentIcon} alt="home icon" width={20} height={20} />
      ),
    },
    {
      name: t("CONTACT"),
      href: `/${locale}/contact`,
      icon: <Image src={contactIcon} alt="home icon" width={20} height={20} />,
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src={logo}
            alt="Logo"
            width={500}
            height={500}
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        </div>
        <div ref={menuRef}>
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            style={isOpen ? { color: "black" } : { color: "#fff" }}
          >
            ☰
          </button>
          <div
            className={`${styles.menuContainer} ${isOpen ? styles.open : ""}`}
          >
            <div className={`${styles.menu}`}>
              <ul>
                <li>
                  <Link
                    href={
                      locale === "en"
                        ? `/ar/${pathname.slice(4)}?${
                            searchParams ? searchParams : ""
                          }`
                        : `/en/${pathname.slice(4)}?${
                            searchParams ? searchParams : ""
                          }`
                    }
                    onClick={() => setIsOpen(false)}
                    prefetch={true}
                  >
                    <div className={styles.languageSwitch}>
                      {locale === "en" ? (
                        // <Image
                        //   src={en}
                        //   alt="ar"
                        //   width={100}
                        //   height={100}
                        //   style={{ width: "10%", height: "auto" }}
                        // />
                        <span>AR</span>
                      ) : (
                        // <Image
                        //   src={ar}
                        //   alt="ar"
                        //   width={100}
                        //   height={100}
                        //   style={{ width: "10%", height: "auto" }}
                        // />
                        <span>EN</span>
                      )}
                    </div>
                  </Link>{" "}
                </li>
                <li>
                  {navbarElements.map(
                    (
                      el: { href: string; name: string; icon: any },
                      ind: React.Key | null | undefined
                    ) => (
                      <li key={ind}>
                        <Link
                          href={`${el.href}`}
                          prefetch={true}
                          onClick={() => setIsOpen(false)}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            {el.icon}
                            <p>{el.name}</p>
                          </div>
                        </Link>
                      </li>
                    )
                  )}
                </li>
                <li>
                  {!isLogged ? (
                    <Link
                      href={`/${locale}/register`}
                      prefetch={true}
                      onClick={() => setIsOpen(false)}
                    >
                      {t("SIGNUP")}
                    </Link>
                  ) : (
                    <Link
                      href={`/${locale}/history`}
                      prefetch={true}
                      onClick={() => setIsOpen(false)}
                    >
                      {t("HISTORY")}
                    </Link>
                  )}
                </li>
                <li>
                  {!isLogged ? (
                    <Button
                      onClicks={`/${locale}/login`}
                      type={undefined}
                      text={t("LOGIN")}
                    />
                  ) : (
                    <Link
                      href={`/$${locale}/profile`}
                      prefetch={true}
                      onClick={() => setIsOpen(false)}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Image
                          src={profileIcon}
                          alt="home icon"
                          width={20}
                          height={20}
                        />
                        <p>{t("PROFILE")}</p>
                      </div>
                    </Link>
                  )}
                </li>
                <li>
                  {isLogged &&(
                    <Link
                      href={`#`}
                      prefetch={true}
                      onClick={() => {
                        localStorage.removeItem("token");
                        document.location.reload();
                        setIsOpen(false);
                      }}
                    >
                      {t("LOGOUT")}
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveHeader;
