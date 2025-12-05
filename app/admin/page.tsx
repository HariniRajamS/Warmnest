"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./admin.module.css";

interface AdminAppointment {
  _id: string;
  userId: string;
  name: string;
  email: string;
  date: string;
  time: string;
  timezone: string;
  reason: string;
  status: string;
  createdAt: string;
  adminComment: string;
  alternateSlots: { date: string; time: string; timezone: string }[];
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminComment, setComment] = useState("");
  const [date, setSlotDate] = useState("");
  const [time, setSlotTime] = useState("");

  // Protect route
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/user");
    }
  }, [status, session, router]);

  // Load appointments when admin authenticated
  useEffect(() => {
    if (status !== "authenticated" || session?.user?.role !== "admin") return;

    const load = async () => {
      try {
        const res = await fetch("/api/admin/appointments");
        const data: AdminAppointment[] = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to load admin appointments", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [status, session]);

  if (status !== "authenticated" || session?.user?.role !== "admin") {
    return null;
  }
  async function approveBooking(id: string) {
    await fetch("/api/admin/appointments/update", {
      method: "PATCH",
      body: JSON.stringify({
        id,
        status: "Approved",
        adminComment,
        alternateSlots: [{ date, time, timezone: "Asia/Kolkata" }],
      }),
    });
    location.reload();
  }

  async function rejectBooking(id: string) {
    await fetch("/api/admin/appointments/update", {
      method: "PATCH",
      body: JSON.stringify({
        id,
        status: "Rejected",
        adminComment,
        alternateSlots: [],
      }),
    });
    location.reload();
  }

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.header}>
          <h1>Admin Dashboard</h1>
          <p>Manage all Warmnest appointments</p>
        </section>

        <section className={styles.content}>
          {loading ? (
            <p>Loading appointments…</p>
          ) : appointments.length === 0 ? (
            <p>No appointments yet.</p>
          ) : (
            <>
              <div className={styles.list}>
                {appointments.map((a) => (
                  <div key={a._id} className={styles.card}>
                    <div className={styles.rowTop}>
                      <div className={styles.userBlock}>
                        <h3>{a.name}</h3>
                        <div className={styles.email}>{a.email}</div>
                      </div>

                      <span
                        className={
                          a.status === "Pending"
                            ? styles.statusPending
                            : a.status === "Approved"
                            ? styles.statusApproved
                            : styles.statusRejected
                        }
                      >
                        {a.status}
                      </span>
                    </div>

                    <div className={styles.rowInfo}>
                      <div>
                        <span className={styles.label}>Date:</span> {a.date}
                      </div>

                      <div>
                        <span className={styles.label}>Time:</span> {a.time}
                      </div>

                      <div>({a.timezone})</div>
                    </div>

                    <div className={styles.reason}>
                      <span className={styles.label}>Reason:</span> {a.reason}
                    </div>

                    <div className={styles.adminPanel}>
                      <textarea
                        placeholder="Admin comments"
                        className={styles.comment}
                        onChange={(e) => setComment(e.target.value)}
                      />

                      <div className={styles.slotRow}>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setSlotDate(e.target.value)}
                        />

                        <input
                          type="time"
                          value={time}
                          onChange={(e) => setSlotTime(e.target.value)}
                        />
                      </div>

                      <div className={styles.actions}>
                        <button
                          onClick={() => approveBooking(a._id)}
                          className={styles.approveBtn}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => rejectBooking(a._id)}
                          className={styles.rejectBtn}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
