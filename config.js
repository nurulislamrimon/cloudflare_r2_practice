import dotenv from "dotenv";

dotenv.config({});

export const config = {
  PORT: process.env.PORT || 5000,
  CLOUDFLARE_ACCESS_KEY: process.env.CLOUDFLARE_ACCESS_KEY,
  CLOUDFLARE_SECRET_KEY: process.env.CLOUDFLARE_SECRET_KEY,
  CLOUDFLARE_BUCKET_NAME: process.env.CLOUDFLARE_BUCKET_NAME || "learning",
  CLOUDFLARE_BUCKET_URL: process.env.CLOUDFLARE_BUCKET_URL,
};
