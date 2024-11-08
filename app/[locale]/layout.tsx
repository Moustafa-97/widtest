/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import HeaderLayout from "./HeaderLayout"; // Import the new client-side header component
import { Metadata } from "next";
// import { cookies } from "next/headers";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Script from "next/script";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "TRAZLER",
  description: "Booking application",
};
export default async function LocaleLayout({
  children,
  params: { locale: locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Fetch messages server-side
  const messages = await getMessages(locale as any);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <Script
        src="https://www.paytabs.com/js/paylib.js"
        strategy="afterInteractive"
      />
      <body className={montserrat.className}>
        <NextIntlClientProvider messages={messages}>
          <HeaderLayout locale={locale}>{children}</HeaderLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
