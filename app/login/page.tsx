"use client";

import styles from "./login.module.css";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl: "/user",
    });

    if (res?.error) {
      alert("Invalid email or password");
    } else {
      window.location.href = "/user";
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Brand */}
        <div className={styles.logo}>
          <img src="/logo.png" alt="Warmnest Logo" />
        </div>

        <h2 className={styles.heading}>Welcome Back</h2>
        <p className={styles.subtext}>Login to continue your healing journey</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className={styles.forgot}>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className={styles.divider}>OR</div>

        {/* Google Sign In */}
        <button
          className={styles.google}
          onClick={() => signIn("google", { callbackUrl: "/user" })}
        >
          <Image src="/google.png" alt="Google" width={18} height={18} />
          Sign in with Google
        </button>

        {/* Footer */}
        <p className={styles.footer}>
          Don&apos;t have an account? <Link href="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
