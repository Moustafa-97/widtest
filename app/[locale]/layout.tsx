/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import HeaderLayout from "./HeaderLayout";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
// app/page.tsx or app/page.js (if it's your main page)
export const metadata: Metadata = {
  title: "WID - Apartment Booking",
  description:
    "Discover and book your ideal apartment with ease using Wid Residences.",
  keywords: [
    "apartment booking",
    "holiday rentals",
    "vacation stays",
    "Wid Residences",
  ],
  openGraph: {
    title: "WID - Apartment Booking",
    description:
      "Find your next stay with Wid Residences and enjoy top-rated apartments.",
    url: "https://widresidences.com",
    siteName: "Wid Residences",
    images: [
      {
        url: "../../public/logo.svg",
        width: 800,
        height: 600,
        alt: "Wid Residences cover image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WID - Apartment Booking",
    description:
      "Book top-rated apartments for short-term or long-term stays with Wid Residences.",
    images: ["../../public/logo.svg"],
  },
  // Additional Custom Meta Tags
  metadataBase: new URL("https://widresidences.com"),
  facebook: {
    appId: "YOUR_FACEBOOK_APP_ID",
    },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      </body>
    </html>
  );
}
