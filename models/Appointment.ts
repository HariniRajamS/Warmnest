import mongoose, { Schema, models, model } from "mongoose";

export interface AppointmentDocument extends mongoose.Document {
  userId: string;
  name: string;
  email: string;
  date: string;
  time: string;
  timezone: string;
  reason: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  adminComment: string;

  alternateSlots: [
    {
      date: string;
      time: string;
      timezone: string;
    }
  ];
}

const AppointmentSchema = new Schema<AppointmentDocument>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    timezone: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, default: "Pending" },
    adminComment: { type: String },
    alternateSlots: [
      {
        date: { type: String },
        time: { type: String },
        timezone: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite in dev hot-reload
const Appointment =
  models.Appointment ||
  model<AppointmentDocument>("Appointment", AppointmentSchema);

export default Appointment;
