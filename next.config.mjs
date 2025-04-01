/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ Cloudinary's domain
        pathname: "**", // allows all image paths
      },
    ],
  },
};

export default nextConfig;
