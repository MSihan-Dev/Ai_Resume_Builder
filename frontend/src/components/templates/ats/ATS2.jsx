const ATS2 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <h1 style={styles.name}>{form.name || "Your Name"}</h1>

      <p style={styles.contact}>
        {form.title} | {form.email} | {form.phone}
      </p>

      <p style={styles.contact}>
        {form.address} | {form.linkedin} | {form.github}
      </p>

      {/* SUMMARY */}
      <Section title="Summary">
        <p>{form.summary || "Short professional summary."}</p>
      </Section>

      {/* SKILLS */}
      <Section title="Skills">
        <p>{form.skills?.join(", ")}</p>
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience">
        {form.experience?.map((e, i) => (
          <div key={i} style={styles.block}>
            <b>
              {e.role} - {e.company}
            </b>{" "}
            <span>({e.duration})</span>
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
          <p key={i}>
            <b>{ed.degree}</b> - {ed.institute} ({ed.year})
          </p>
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
    <h3 style={styles.heading}>{title}</h3>
    {children}
  </div>
);

/* =========================
   STYLES (COMPACT ATS)
========================= */
const styles = {
  page: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial",
    fontSize: "13px",
    color: "#000",
    background: "#fff",
    lineHeight: "1.4",
  },

  name: {
    fontSize: "20px",
    marginBottom: "4px",
  },

  contact: {
    fontSize: "12px",
    marginBottom: "6px",
  },

  section: {
    marginTop: "10px",
  },

  heading: {
    fontSize: "13px",
    borderBottom: "1px solid #000",
    marginBottom: "4px",
  },

  block: {
    marginBottom: "6px",
  },

  text: {
    margin: 0,
  },
};

export default ATS2;
