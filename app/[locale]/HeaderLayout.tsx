/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePathname } from "next/navigation";
import Header from "@/Components/Header/Header";
import MobileAppFooter from "@/Components/Footer/Footer";

export default function HeaderLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const pathname = usePathname();

  const token = localStorage.getItem("token");

  const headerRoutes = [
    `/${locale}/login`,
    `/${locale}/register`,
    `/${locale}/forgetPassword`,
    `/${locale}/otp`,
    `/${locale}/resetPassword`,
  ];
  const SecondaryheaderRoutes = [
    `/${locale}/privacyAndPolicy`,
    `/${locale}/terms`,
  ];

  return (
    <>
      {!headerRoutes.includes(pathname) && (
        <header>
          <Header token={token} />
        </header>
      )}
      {children}
      {!headerRoutes.includes(pathname) &&
        !SecondaryheaderRoutes.includes(pathname) && (
          <footer>
            <MobileAppFooter />
          </footer>
        )}
    </>
  );
}
