"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./payment.module.css";

interface Appointment {
  _id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  timezone: string;
  status: string;
}

export default function PaymentPage() {
  const params = useSearchParams();
  const appointmentId = params.get("appointmentId");

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetch(`https://ipapi.co/json`)
      .then((r) => r.json())
      .then((d) => setCountry(d.country));
  }, []);

  useEffect(() => {
    if (!appointmentId) return;

    fetch(`/api/booking?appointmentId=${appointmentId}`)
      .then((res) => res.json())
      .then((data) => setAppointment(data));
  }, [appointmentId]);

  const handlePay = () => {
    if (country === "IN") {
      window.location.href = `/api/payment/razorpay?appointmentId=${appointmentId}`;
    } else {
      window.location.href = `/api/payment/stripe?appointmentId=${appointmentId}`;
    }
  };

  if (!appointment) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Confirm & Pay</h1>
        <p className={styles.subtitle}>Complete payment to confirm session</p>

        <div className={styles.section}>
          <h3>Therapist</h3>
          <p>Aishwarya Krish</p>
        </div>

        <div className={styles.section}>
          <h3>Client</h3>
          <p>{appointment.name}</p>
          <p className={styles.email}>{appointment.email}</p>
        </div>

        <div className={styles.section}>
          <h3>Appointment</h3>
          <p>{appointment.date}</p>
          <p>
            {appointment.time} ({appointment.timezone})
          </p>
        </div>

        <div className={styles.section}>
          <h3>Status</h3>
          <span className={styles.approved}>{appointment.status}</span>
        </div>

        <div className={styles.priceBox}>
          <p className={styles.priceLabel}>Session Fee</p>
          <p className={styles.price}>{country === "IN" ? "₹1199" : "$15"}</p>
        </div>

        <button onClick={handlePay} className={styles.payBtn}>
          Pay Now
        </button>

        <p className={styles.footer}>Secure payment • Encrypted checkout</p>
      </div>
    </div>
  );
}
