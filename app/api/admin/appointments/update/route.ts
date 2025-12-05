import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";
import { sendApprovalMail } from "@/lib/mailer";

export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, status, adminComment, alternateSlots } = body;

  await connectDB();

  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status, adminComment, alternateSlots },
    { new: true }
  );

  // Send email after admin action
  await sendApprovalMail(appointment);

  return NextResponse.json({ success: true });
}
