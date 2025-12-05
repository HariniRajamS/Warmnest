"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import styles from "./register.module.css";

interface RegisterForm {
  name?: string;
  email?: string;
  password?: string;
  image?: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({});
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let imageUrl = "";

    if (form.image) {
      const upload = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ image: form.image }),
      });
      const data = await upload.json();
      imageUrl = data.url;
    }

    await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        image: imageUrl,
      }),
    });

    router.push("/login");
  }

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setForm({ ...form, image: reader.result });
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files![0]);
  };

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Create Account</h2>
          <p>Start your healing journey with Warmnest</p>

          {/* Avatar */}
          <div className={styles.avatar}>
            <img
              src={
                preview ||
                "https://api.dicebear.com/7.x/initials/svg?seed=Warmnest&backgroundColor=34d399"
              }
              alt="Preview"
            />
            <label>
              Upload photo
              <input type="file" hidden onChange={uploadImage} />
            </label>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              placeholder="Full Name"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email Address"
              type="email"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button>Create Account</button>
          </form>

          <p className={styles.footer}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </>
  );
}
