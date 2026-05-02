const Creative4 = ({ form }) => {
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
            "Creative developer focused on building impactful digital products and experiences."}
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

      {/* PROJECTS (MAIN HIGHLIGHT) */}
      <Section title="Featured Projects">
        <div style={styles.projectGrid}>
          {form.projects?.map((p, i) => (
            <div key={i} style={styles.projectCard}>
              <h4>{p.name}</h4>
              <p style={styles.text}>{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience">
        {form.experience?.map((e, i) => (
          <div key={i} style={styles.block}>
            <b>{e.role}</b>
            <div style={styles.small}>
              {e.company} | {e.duration}
            </div>
            <p style={styles.text}>{e.description}</p>
          </div>
        ))}
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
   STYLES (PORTFOLIO STYLE)
========================= */
const styles = {
  page: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "25px",
    fontFamily: "Arial",
    background: "#f8fafc",
  },

  header: {
    background: "#0ea5e9",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },

  name: {
    margin: 0,
    fontSize: "26px",
  },

  title: {
    fontSize: "14px",
    marginTop: "5px",
  },

  contact: {
    marginTop: "10px",
    fontSize: "12px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  section: {
    marginTop: "20px",
  },

  sectionTitle: {
    fontSize: "15px",
    marginBottom: "10px",
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
    background: "#e0f2fe",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },

  projectCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },

  block: {
    marginBottom: "10px",
  },

  small: {
    fontSize: "12px",
    color: "#555",
  },
};

export default Creative4;
