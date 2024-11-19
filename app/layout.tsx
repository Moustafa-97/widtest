/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WID not found",
  description: "Booking application",
};
export default function LocaleLayout({
  children,
  params: { locale: locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  );
}
