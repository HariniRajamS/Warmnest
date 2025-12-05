import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";
import { sendAppointmentMail } from "@/lib/mailer";
import mongoose, { Types } from "mongoose";

/* ========================
   TYPE DEFINITIONS
======================== */

interface BookingRequest {
  userId: string;
  name: string;
  email: string;
  date: string;
  time: string;
  timezone: string;
  reason: string;
}

interface AppointmentDoc extends mongoose.Document {
  _id: Types.ObjectId;
  userId: string;
  name: string;
  email: string;
  date: string;
  time: string;
  timezone: string;
  reason: string;
  status: string;
  createdAt: Date;
}

/* ========================
   CREATE APPOINTMENT
======================== */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body: BookingRequest = await req.json();

    // ✅ Required field validation
    const { userId, name, email, date, time, timezone, reason } = body;

    if (!userId || !email || !date || !time || !timezone || !reason) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // ✅ Save to MongoDB
    const result = (await Appointment.create(body)) as AppointmentDoc;

    // ✅ Send email after DB success
    await sendAppointmentMail(
      result.email,
      result.name,
      result.date,
      result.time
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error("BOOKING ERROR:", error);

    return NextResponse.json(
      { error: "Failed to book appointment" },
      { status: 500 }
    );
  }
}

/* ========================
   FETCH USER APPOINTMENTS
======================== */
export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    const appointments: AppointmentDoc[] = await Appointment.find({ email })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(appointments, { status: 200 });
  } catch (error: unknown) {
    console.error("FETCH ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
