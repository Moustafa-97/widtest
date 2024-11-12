/* eslint-disable @typescript-eslint/no-explicit-any */

import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./[locale]/globals.css";

// import Script from "next/script";

export const metadata: Metadata = {
  title: "WID not found",
  description: "Booking application",
};
export default async function LocaleLayout({
  children,
  params: { locale: locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(locale as any);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

        {/* <Script src="https://secure-egypt.PayTabs.com/payment/js/paylib.js" /> */}
      </body>
    </html>
  );
}
