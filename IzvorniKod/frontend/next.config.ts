import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.iconscout.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "cdn3.iconfinder.com",
      },
      {
        protocol: "https",
        hostname: "gym-progress-app.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "gymprogresstrackerbucket.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
  /* other config options here */
};

export default nextConfig;
