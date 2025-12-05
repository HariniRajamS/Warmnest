"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import styles from "./user.module.css";

interface BookingForm {
  location: string;
  timezone: string;
  date: string;
  time: string;
  reason: string;
}

interface IpApiResponse {
  country_name?: string;
}
interface AlternateSlot {
  date: string;
  time: string;
  timezone: string;
}

interface Appointment {
  _id: string;
  userId: string;
  name: string;
  email: string;
  date: string;
  time: string;
  timezone: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
  alternateSlots?: AlternateSlot[];
  adminComment?: string;
}

const UserPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // ✅ Initialize timezone here (no effect needed)
  const [form, setForm] = useState<BookingForm>(() => ({
    location: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    date: "",
    time: "",
    reason: "",
  }));

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // ✅ Effect only for async location fetch (allowed)
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) return;

        const data: IpApiResponse = await res.json();
        if (!data.country_name) return;

        const country = data.country_name;
        if (!country) return;

        setForm((prev) =>
          prev.location === country ? prev : { ...prev, location: country }
        );
      } catch (error) {
        console.warn("Location detection failed", error);
      }
    };

    fetchLocation();
  }, [status]);

  useEffect(() => {
    if (status !== "authenticated") return;

    const loadAppointments = async () => {
      const res = await fetch(`/api/booking?email=${session?.user?.email}`);
      const data: Appointment[] = await res.json();
      setAppointments(data);
    };

    loadAppointments();
  }, [status, session]);

  if (status === "loading" || !session) {
    return (
      <>
        <Navbar />
        <main className={styles.page}>
          <section className={styles.hero}>
            <p>Loading your workspace…</p>
          </section>
        </main>
      </>
    );
  }

  const firstName =
    (session.user?.name && session.user.name.split(" ")[0]) || "there";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user?.email,
          name: session.user?.name,
          email: session.user?.email,
          ...form,
        }),
      });

      if (!res.ok) {
        console.error("Booking failed");
        alert("Something went wrong while booking. Please try again.");
        return;
      }

      alert("✅ Appointment request sent");

      setForm((prev) => ({
        ...prev,
        date: "",
        time: "",
        reason: "",
      }));
    } catch (error) {
      console.error("Booking error", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        {/* Welcome Banner */}
        <section className={styles.hero}>
          <h1>Welcome back, {firstName}</h1>
          <p>Your mental wellness space 🌿</p>
        </section>

        {/* Booking Card */}
        <section className={styles.center}>
          <div className={styles.card}>
            <h2>Book Appointment</h2>
            <p className={styles.sub}>Request your therapy session</p>

            <form onSubmit={handleSubmit}>
              <label>Your Name</label>
              <input value={session.user?.name ?? ""} disabled />

              <label>Email</label>
              <input value={session.user?.email ?? ""} disabled />

              <label>Location</label>
              <input value={form.location} disabled />

              <label>Timezone</label>
              <input value={form.timezone} disabled />

              <label htmlFor="date">Preferred Date</label>
              <input
                id="date"
                name="date"
                type="date"
                required
                value={form.date}
                onChange={handleChange}
              />

              <label htmlFor="time">Preferred Time</label>
              <input
                id="time"
                name="time"
                type="time"
                required
                value={form.time}
                onChange={handleChange}
              />

              <label htmlFor="reason">What do you want to talk about?</label>
              <textarea
                id="reason"
                name="reason"
                placeholder="e.g. Anxiety, relationship, emotional stress"
                value={form.reason}
                onChange={handleChange}
                required
              />

              <button type="submit">Request Appointment</button>
            </form>
          </div>
          {appointments.length > 0 && (
            <div className={styles.appointments}>
              <h3>My Appointments</h3>

              {appointments.map((a: Appointment) => (
                <div key={a._id} className={styles.appointmentCard}>
                  <p>
                    <strong>Date:</strong> {a.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {a.time}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        a.status === "Approved"
                          ? styles.approved
                          : a.status === "Rejected"
                          ? styles.rejected
                          : styles.pending
                      }
                    >
                      {a.status}
                    </span>
                  </p>
                  {a.adminComment && (
                    <div className={styles.adminNote}>
                      <strong>Therapist Note:</strong>
                      <p>{a.adminComment}</p>
                    </div>
                  )}
                  {a.alternateSlots?.length > 0 && (
                    <div className={styles.altSlots}>
                      <strong>Suggested Slots:</strong>
                      {a.alternateSlots.map((s, i) => (
                        <p key={i}>
                          {s.date} — {s.time} ({s.timezone})
                        </p>
                      ))}
                    </div>
                  )}
                  {a.status === "Approved" && (
                    <button
                      className={styles.payBtn}
                      onClick={() =>
                        router.push(`/payment?appointmentId=${a._id}`)
                      }
                    >
                      Proceed to Payment
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default UserPage;
