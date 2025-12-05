import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password, image } = body;

  console.log("REGISTER REQUEST:", body); // DEBUG

  if (!password) {
    return NextResponse.json(
      { error: "Password not received" },
      { status: 400 }
    );
  }

  await connectDB();

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    image,
    provider: "credentials",
  });

  console.log("SAVED USER:", user); // DEBUG

  return NextResponse.json({ success: true });
}
