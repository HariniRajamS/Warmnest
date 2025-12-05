import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const { image } = await req.json();

  const res = await cloudinary.uploader.upload(image, {
    folder: "warmnest",
  });

  return NextResponse.json({ url: res.secure_url });
}
