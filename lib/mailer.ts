import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendAppointmentMail(
  to: string,
  name: string,
  date: string,
  time: string
) {
  await transporter.sendMail({
    from: `"Warmnest" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🌿 Appointment Request Received",
    html: `
      <h2>Hello ${name},</h2>
      <p>Your appointment request has been received successfully.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p>Status: <b style="color:orange">Pending</b></p>
      <br/>
      <p>We will contact you once the therapist confirms.</p>
      <p>Warmnest Team 💚</p>
    `,
  });
}

export async function sendApprovalMail(booking: any) {
  const slotList = booking.alternateSlots?.length
    ? booking.alternateSlots
        .map((s: any) => `<li>${s.date} at ${s.time} (${s.timezone})</li>`)
        .join("")
    : "";

  await transporter.sendMail({
    from: `"Warmnest" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: "🧠 Your Appointment Status Update",
    html: `
      <h3>Hello ${booking.name}</h3>
      <p>Status: <b>${booking.status}</b></p>
      <p>${booking.adminComment || ""}</p>

      ${
        slotList
          ? `<p><b>Suggested Time Slots:</b></p><ul>${slotList}</ul>`
          : ""
      }

      ${
        booking.status === "Approved"
          ? "<p>You may proceed with payment.</p>"
          : ""
      }

      <p>Warmnest Team</p>
    `,
  });
}
