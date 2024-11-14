/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import HeaderLayout from "./HeaderLayout";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "WID - Apartment Booking",
  description:
    "Discover and book your ideal apartment with ease using Wid Residences.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
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
        url: "/logo.svg", // Direct path from public folder
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
    images: ["/logo.svg"], // Direct path from public folder
  },
  metadataBase: new URL("https://widresidences.com"),
  additionalMetaTags: [
    // Facebook (Open Graph)
    { property: "fb:app_id", content: "YOUR_FACEBOOK_APP_ID" },
    { property: "og:locale", content: "en_US" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Wid Residences" },
    { property: "og:image", content: "https://widresidences.com/logo.svg" },
    { property: "og:image:alt", content: "Wid Residences cover image" },

    // Slack (Uses Open Graph)
    { property: "og:image", content: "https://widresidences.com/logo.svg" },
    { property: "og:image:type", content: "image/svg+xml" },
    { property: "og:image:width", content: "800" },
    { property: "og:image:height", content: "600" },

    // WhatsApp (Uses Open Graph)
    { property: "og:image", content: "https://widresidences.com/logo.svg" },

    // Snapchat (Uses Open Graph)
    { property: "og:image", content: "https://widresidences.com/logo.svg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    // Robots Meta Tags
    { name: "robots", content: "index, follow, nocache" },
    {
      name: "googlebot",
      content:
        "index, follow, noimageindex, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
    },
  ],
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
    <main lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className={montserrat.className}>
        <NextIntlClientProvider messages={messages}>
          <HeaderLayout locale={locale}>{children}</HeaderLayout>
        </NextIntlClientProvider>
      </div>
    </main>
  );
}
