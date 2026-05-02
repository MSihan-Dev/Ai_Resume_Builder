const ATS5 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.name}>{form.name || "Your Name"}</h1>
        <p style={styles.title}>{form.title || "Software Engineer"}</p>

        <p style={styles.contact}>
          {form.email} | {form.phone} | {form.address}
        </p>

        <p style={styles.contact}>
          {form.linkedin} | {form.github} | {form.portfolio}
        </p>
      </div>

      {/* SUMMARY */}
      <Section title="Professional Summary">
        <p>
          {form.summary ||
            "Results-driven professional with experience in building scalable applications and strong problem-solving skills."}
        </p>
      </Section>

      {/* CORE SKILLS */}
      <Section title="Core Skills">
        <ul>
          {form.skills?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </Section>

      {/* EXPERIENCE (PRIORITY SECTION) */}
      <Section title="Professional Experience">
        {form.experience?.map((e, i) => (
          <div key={i} style={styles.block}>
            <b>
              {e.role} — {e.company}
            </b>
            <div style={styles.small}>{e.duration}</div>
            <p>{e.description}</p>
          </div>
        ))}
      </Section>

      {/* PROJECTS */}
      <Section title="Key Projects">
        {form.projects?.map((p, i) => (
          <div key={i} style={styles.block}>
            <b>{p.name}</b>
            <p>{p.description}</p>
          </div>
        ))}
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        {form.education?.map((ed, i) => (
          <div key={i} style={styles.block}>
            <b>{ed.degree}</b>
            <div style={styles.small}>
              {ed.institute} | {ed.year}
            </div>
          </div>
        ))}
      </Section>

      {/* EXTRAS */}
      <Section title="Additional Information">
        {form.certifications?.length > 0 && (
          <p>
            <b>Certifications:</b> {form.certifications.join(", ")}
          </p>
        )}

        {form.achievements?.length > 0 && (
          <p>
            <b>Achievements:</b> {form.achievements.join(", ")}
          </p>
        )}
      </Section>
    </div>
  );
};

/* =========================
   SECTION
========================= */
const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h3 style={styles.heading}>{title}</h3>
    {children}
  </div>
);

/* =========================
   STYLES (FINAL ATS)
========================= */
const styles = {
  page: {
    maxWidth: "800px",
    margin: "auto",
    padding: "25px",
    fontFamily: "Arial",
    fontSize: "13px",
    color: "#000",
    background: "#fff",
    lineHeight: "1.6",
  },

  header: {
    borderBottom: "2px solid #000",
    marginBottom: "15px",
    paddingBottom: "10px",
  },

  name: {
    fontSize: "24px",
    marginBottom: "3px",
  },

  title: {
    fontSize: "14px",
    marginBottom: "5px",
  },

  contact: {
    fontSize: "12px",
    marginBottom: "4px",
  },

  section: {
    marginTop: "12px",
  },

  heading: {
    fontSize: "14px",
    borderBottom: "1px solid #000",
    marginBottom: "6px",
  },

  block: {
    marginBottom: "10px",
  },

  small: {
    fontSize: "12px",
  },
};

export default ATS5;
