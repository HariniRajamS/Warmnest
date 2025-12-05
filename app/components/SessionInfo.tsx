import styles from "@/styles/session.module.css";

export default function SessionInfo() {
  const info = [
    {
      title: "1-on-1 Therapy",
      desc: "Private sessions tailored to your mental health needs.",
    },
    {
      title: "Online Sessions",
      desc: "Attend from any country with automatic timezone detection.",
    },
    {
      title: "45–60 Minutes",
      desc: "A complete space to express, reflect and heal.",
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Session Details</h2>

      <div className={styles.grid}>
        {info.map((item, i) => (
          <div key={i} className={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
