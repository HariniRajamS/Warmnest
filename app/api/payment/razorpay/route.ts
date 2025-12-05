import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const appointmentId = searchParams.get("appointmentId");

  const order = await razorpay.orders.create({
    amount: 1199 * 100,
    currency: "INR",
    receipt: appointmentId!,
  });

  return NextResponse.json(order);
}
