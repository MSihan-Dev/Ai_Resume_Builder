const Minimal1 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.name}>{form.name || "Your Name"}</h1>
          <p style={styles.title}>{form.title || "Professional Title"}</p>
        </div>

        <div style={styles.contact}>
          <p>{form.email}</p>
          <p>{form.phone}</p>
          <p>{form.address}</p>
        </div>
      </div>

      {/* LINKS */}
      <div style={styles.links}>
        {form.linkedin && <span>{form.linkedin}</span>}
        {form.github && <span>{form.github}</span>}
        {form.portfolio && <span>{form.portfolio}</span>}
      </div>

      {/* SUMMARY */}
      <Section title="Summary">
        <p style={styles.text}>
          {form.summary ||
            "Dedicated professional with strong technical and problem-solving skills."}
        </p>
      </Section>

      {/* SKILLS */}
      <Section title="Skills">
        <p style={styles.text}>{form.skills?.join(", ")}</p>
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience">
        {form.experience?.map((e, i) => (
          <div key={i} style={styles.block}>
            <b>{e.role}</b> — {e.company}
            <div style={styles.small}>{e.duration}</div>
            <p style={styles.text}>{e.description}</p>
          </div>
        ))}
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        {form.projects?.map((p, i) => (
          <div key={i} style={styles.block}>
            <b>{p.name}</b>
            <p style={styles.text}>{p.description}</p>
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
   STYLES (MINIMAL CLEAN)
========================= */
const styles = {
  page: {
    maxWidth: "850px",
    margin: "auto",
    padding: "25px",
    fontFamily: "Arial",
    background: "#fff",
    color: "#111",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
  },

  name: {
    fontSize: "26px",
    margin: 0,
  },

  title: {
    fontSize: "13px",
    color: "#555",
  },

  contact: {
    textAlign: "right",
    fontSize: "12px",
    color: "#444",
  },

  links: {
    marginTop: "8px",
    fontSize: "12px",
    color: "#555",
    display: "flex",
    gap: "10px",
  },

  section: {
    marginTop: "15px",
  },

  sectionTitle: {
    fontSize: "12px",
    borderBottom: "1px solid #ddd",
    marginBottom: "5px",
    paddingBottom: "3px",
  },

  text: {
    fontSize: "12px",
    lineHeight: "1.5",
  },

  block: {
    marginBottom: "10px",
  },

  small: {
    fontSize: "11px",
    color: "#666",
  },
};

export default Minimal1;
