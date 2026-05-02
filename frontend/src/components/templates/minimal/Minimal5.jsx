const Minimal5 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.name}>{form.name || "Your Name"}</h1>
          <p style={styles.title}>{form.title || "Professional Title"}</p>
        </div>

        <div style={styles.rightHeader}>
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
            "Detail-oriented professional with strong analytical skills and experience in delivering quality solutions."}
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
            <div style={styles.row}>
              <b>{e.role}</b>
              <span style={styles.small}>{e.duration}</span>
            </div>

            <div style={styles.small}>{e.company}</div>
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
            <div style={styles.row}>
              <b>{ed.degree}</b>
              <span style={styles.small}>{ed.year}</span>
            </div>

            <div style={styles.small}>{ed.institute}</div>
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
   STYLES (BALANCED MINIMAL)
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
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },

  name: {
    fontSize: "26px",
    margin: 0,
  },

  title: {
    fontSize: "13px",
    color: "#666",
  },

  rightHeader: {
    textAlign: "right",
    fontSize: "12px",
    color: "#444",
  },

  links: {
    marginTop: "8px",
    display: "flex",
    gap: "10px",
    fontSize: "12px",
    color: "#333",
  },

  section: {
    marginTop: "15px",
  },

  sectionTitle: {
    fontSize: "12px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "3px",
    marginBottom: "5px",
  },

  text: {
    fontSize: "12px",
    lineHeight: "1.5",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },

  skill: {
    background: "#f3f4f6",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "11px",
  },

  block: {
    marginBottom: "10px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
  },

  small: {
    fontSize: "11px",
    color: "#666",
  },
};

export default Minimal5;
