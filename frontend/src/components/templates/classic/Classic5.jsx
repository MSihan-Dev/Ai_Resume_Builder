const Classic5 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.name}>{form.name || "Your Name"}</h1>
          <p style={styles.title}>{form.title || "Software Developer"}</p>
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
      <Section title="Professional Summary">
        <p style={styles.text}>
          {form.summary ||
            "Results-oriented professional with experience in developing scalable applications and solving business problems."}
        </p>
      </Section>

      {/* SKILLS */}
      <Section title="Core Skills">
        <div style={styles.skills}>
          {form.skills?.map((s, i) => (
            <span key={i} style={styles.skill}>
              {s}
            </span>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section title="Professional Experience">
        {form.experience?.map((e, i) => (
          <div key={i} style={styles.block}>
            <div style={styles.row}>
              <b>{e.role}</b>
              <span style={styles.duration}>{e.duration}</span>
            </div>

            <div style={styles.company}>{e.company}</div>

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
              <span style={styles.duration}>{ed.year}</span>
            </div>

            <div style={styles.company}>{ed.institute}</div>
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
   STYLES (CORPORATE CLEAN)
========================= */
const styles = {
  page: {
    maxWidth: "900px",
    margin: "auto",
    padding: "30px",
    fontFamily: "Arial",
    background: "#fff",
    color: "#111",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "2px solid #000",
    paddingBottom: "10px",
  },

  name: {
    fontSize: "28px",
    margin: 0,
  },

  title: {
    fontSize: "14px",
    color: "#555",
  },

  contact: {
    textAlign: "right",
    fontSize: "13px",
  },

  links: {
    marginTop: "8px",
    display: "flex",
    gap: "12px",
    fontSize: "13px",
    color: "#333",
  },

  section: {
    marginTop: "18px",
  },

  sectionTitle: {
    fontSize: "14px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "4px",
    marginBottom: "8px",
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
    border: "1px solid #000",
    padding: "4px 10px",
    borderRadius: "4px",
    fontSize: "12px",
  },

  block: {
    marginBottom: "12px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
  },

  duration: {
    fontSize: "12px",
    color: "#555",
  },

  company: {
    fontSize: "13px",
    color: "#333",
  },
};

export default Classic5;
