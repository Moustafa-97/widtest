import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wid-residencies.sgp1.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "smartrehabcity.co",
      },
      {
        protocol: "https",
        hostname: "dynamic-media-cdn.tripadvisor.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cf.bstatic.com",
      },
      {
        protocol: "https",
        hostname: "www.parisattitude.com",
      },
      {
        protocol: "https",
        hostname: "www.apartments.com",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.widresidences.com/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
