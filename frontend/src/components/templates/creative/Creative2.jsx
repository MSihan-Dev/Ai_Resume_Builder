const Creative2 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.name}>{form.name || "Your Name"}</h1>
        <p style={styles.title}>{form.title || "Frontend Developer"}</p>

        <div style={styles.contact}>
          <span>{form.email}</span>
          <span>{form.phone}</span>
          <span>{form.address}</span>
        </div>
      </div>

      {/* BODY */}
      <div style={styles.body}>
        {/* LEFT */}
        <div style={styles.left}>
          <Card title="Skills">
            <div style={styles.skills}>
              {form.skills?.map((s, i) => (
                <span key={i} style={styles.skill}>
                  {s}
                </span>
              ))}
            </div>
          </Card>

          <Card title="Links">
            <p>{form.linkedin}</p>
            <p>{form.github}</p>
            <p>{form.portfolio}</p>
          </Card>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <Card title="Profile">
            <p style={styles.text}>
              {form.summary ||
                "Passionate developer with strong focus on UI/UX and scalable applications."}
            </p>
          </Card>

          <Card title="Experience">
            {form.experience?.map((e, i) => (
              <div key={i} style={styles.block}>
                <b>{e.role}</b>
                <div style={styles.small}>
                  {e.company} | {e.duration}
                </div>
                <p style={styles.text}>{e.description}</p>
              </div>
            ))}
          </Card>

          <Card title="Projects">
            {form.projects?.map((p, i) => (
              <div key={i} style={styles.block}>
                <b>{p.name}</b>
                <p style={styles.text}>{p.description}</p>
              </div>
            ))}
          </Card>

          <Card title="Education">
            {form.education?.map((ed, i) => (
              <div key={i} style={styles.block}>
                <b>{ed.degree}</b>
                <div style={styles.small}>{ed.institute}</div>
                <div style={styles.small}>{ed.year}</div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

/* =========================
   CARD COMPONENT
========================= */
const Card = ({ title, children }) => (
  <div style={styles.card}>
    <h3 style={styles.cardTitle}>{title}</h3>
    {children}
  </div>
);

/* =========================
   STYLES (MODERN UI)
========================= */
const styles = {
  page: {
    maxWidth: "1000px",
    margin: "auto",
    fontFamily: "Arial",
    background: "#f1f5f9",
  },

  header: {
    background: "#2563eb",
    color: "#fff",
    padding: "25px",
    textAlign: "center",
  },

  name: {
    margin: 0,
    fontSize: "26px",
  },

  title: {
    fontSize: "14px",
    margin: "5px 0",
  },

  contact: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    fontSize: "12px",
    marginTop: "10px",
    flexWrap: "wrap",
  },

  body: {
    display: "flex",
    gap: "20px",
    padding: "20px",
  },

  left: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  right: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },

  cardTitle: {
    fontSize: "14px",
    marginBottom: "8px",
    borderBottom: "1px solid #eee",
    paddingBottom: "5px",
  },

  text: {
    fontSize: "13px",
    lineHeight: "1.5",
  },

  block: {
    marginBottom: "10px",
  },

  small: {
    fontSize: "12px",
    color: "#666",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },

  skill: {
    background: "#e0e7ff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },
};

export default Creative2;
