"use client";

import bgheader from "@/public/logo.svg";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  return (
    <div>
      <header>
        <Link href={`/${locale}`}>
          <Image
            width={1000}
            height={1000}
            src={bgheader}
            alt="logo"
            style={{
              width: "5%",
              minWidth: "60px",
              height: "auto",
              position: "fixed",
            }}
          />
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
