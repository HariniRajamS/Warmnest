import styles from "@/styles/specialization.module.css";

export default function Specialization() {
  const services = [
    {
      title: "Relationship Counseling",
      icon: "💞",
      desc: "Marriage, premarital & LGBTQIA+ support",
    },
    {
      title: "Women's Mental Health",
      icon: "🌼",
      desc: "Emotional & psychological growth for women",
    },
    {
      title: "General Counseling",
      icon: "🧠",
      desc: "Clarity, guidance & emotional healing",
    },
    {
      title: "Trauma Recovery",
      icon: "🕊️",
      desc: "PTSD, childhood trauma & healing",
    },
    {
      title: "Anxiety & Depression",
      icon: "🌿",
      desc: "Peace building & emotional balance",
    },
    {
      title: "Self-Esteem Building",
      icon: "✨",
      desc: "Confidence & self-growth support",
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>What We Specialize In</h2>

      <div className={styles.grid}>
        {services.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.icon}>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
