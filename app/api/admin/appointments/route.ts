import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();

    const appointments = await Appointment.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error("ADMIN FETCH ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin appointments" },
      { status: 500 }
    );
  }
}
