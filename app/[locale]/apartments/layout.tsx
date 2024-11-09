"use client";
import Breadcrumb from "@/Components/breadCrumb/BreadCrumb";

export const metadata = async ({ params }: { params: { id: string } }) => {
  // Assuming you fetch apartment details from an API or use static data
  const apar = await fetch(
    `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/apartments/${params.id}?locale=en`
  );
  const apartment = await apar.json();
  const apartmentImageUrl = apartment?.image || "/default-apartment-image.jpg"; // Fallback to a default image if not available

  return {
    title: `${apartment?.name || "Apartment"} - Wid Residences`,
    description:
      apartment?.description ||
      "Discover this beautiful apartment at Wid Residences.",
    keywords: [
      "apartment booking",
      "vacation rentals",
      "holiday stays",
      "Wid Residences",
      apartment?.name || "Apartment",
    ],
    icons: {
      icon: "/logo.svg",
      shortcut: "/logo.svg",
      apple: "/logo.svg",
    },
    openGraph: {
      title: `${apartment?.name || "Apartment"} - Wid Residences`,
      description:
        apartment?.description ||
        "Discover this beautiful apartment at Wid Residences.",
      url: `https://widresidences.com/apartments/${params.id}`,
      siteName: "Wid Residences",
      images: [
        {
          url: apartmentImageUrl, // Apartment image or fallback
          width: 800,
          height: 600,
          alt: apartment?.name || "Apartment image",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${apartment?.name || "Apartment"} - Wid Residences`,
      description:
        apartment?.description ||
        "Discover this beautiful apartment at Wid Residences.",
      images: [apartmentImageUrl], // Apartment image or fallback
    },
    metadataBase: new URL("https://widresidences.com"),
    additionalMetaTags: [
      // Robots Meta Tags
      { name: "robots", content: "index, follow, nocache" },
      {
        name: "googlebot",
        content:
          "index, follow, noimageindex, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
      },
    ],
  };
};

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="g-mosaic-header">
        <Breadcrumb />
      </header>
      <main>{children}</main>
    </div>
  );
}
