const Creative5 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.name}>{form.name || "Your Name"}</h1>
        <p style={styles.title}>{form.title || "Full Stack Developer"}</p>

        <div style={styles.contact}>
          <span>{form.email}</span>
          <span>{form.phone}</span>
          <span>{form.address}</span>
        </div>
      </div>

      {/* PROFILE */}
      <Section title="Profile">
        <p style={styles.text}>
          {form.summary ||
            "Passionate developer building scalable and high-performance applications."}
        </p>
      </Section>

      {/* SKILLS */}
      <Section title="Skills">
        <div style={styles.skills}>
          {form.skills?.map((s, i) => (
            <span key={i} style={styles.skill}>
              {s}
            </span>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience">
        {form.experience?.map((e, i) => (
          <div key={i} style={styles.block}>
            <b style={styles.highlight}>{e.role}</b>
            <div style={styles.small}>
              {e.company} | {e.duration}
            </div>
            <p style={styles.text}>{e.description}</p>
          </div>
        ))}
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        <div style={styles.projectGrid}>
          {form.projects?.map((p, i) => (
            <div key={i} style={styles.projectCard}>
              <h4 style={styles.highlight}>{p.name}</h4>
              <p style={styles.text}>{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        {form.education?.map((ed, i) => (
          <div key={i} style={styles.block}>
            <b>{ed.degree}</b>
            <div style={styles.small}>{ed.institute}</div>
            <div style={styles.small}>{ed.year}</div>
          </div>
        ))}
      </Section>

      {/* LINKS */}
      <Section title="Links">
        <p>{form.linkedin}</p>
        <p>{form.github}</p>
        <p>{form.portfolio}</p>
      </Section>
    </div>
  );
};

/* =========================
   SECTION
========================= */
const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    {children}
  </div>
);

/* =========================
   STYLES (DARK THEME)
========================= */
const styles = {
  page: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "25px",
    fontFamily: "Arial",
    background: "#0f172a",
    color: "#e2e8f0",
  },

  header: {
    borderBottom: "1px solid #334155",
    paddingBottom: "15px",
    marginBottom: "20px",
  },

  name: {
    margin: 0,
    fontSize: "26px",
    color: "#38bdf8",
  },

  title: {
    fontSize: "14px",
    color: "#94a3b8",
  },

  contact: {
    marginTop: "10px",
    fontSize: "12px",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },

  section: {
    marginBottom: "20px",
  },

  sectionTitle: {
    fontSize: "15px",
    borderBottom: "1px solid #334155",
    paddingBottom: "5px",
    marginBottom: "10px",
    color: "#38bdf8",
  },

  text: {
    fontSize: "13px",
    lineHeight: "1.5",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  skill: {
    background: "#1e293b",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    border: "1px solid #334155",
  },

  block: {
    marginBottom: "12px",
  },

  small: {
    fontSize: "12px",
    color: "#94a3b8",
  },

  highlight: {
    color: "#38bdf8",
  },

  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },

  projectCard: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #334155",
  },
};

export default Creative5;
