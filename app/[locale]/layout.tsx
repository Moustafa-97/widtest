/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import HeaderLayout from "./HeaderLayout";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
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
      <body className={montserrat.className}>
        <NextIntlClientProvider messages={messages}>
          <HeaderLayout locale={locale}>{children}</HeaderLayout>
        </NextIntlClientProvider>
        <Script src="https://secure-egypt.PayTabs.com/payment/js/paylib.js" />
      </body>
    </html>
  );
}
