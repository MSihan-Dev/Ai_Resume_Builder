const AtsProTemplate = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.name}>{form.name || "Full Name"}</h1>
        <p style={styles.title}>{form.title || "Professional Title"}</p>

        <p style={styles.contact}>
          {form.email} | {form.phone} | {form.address}
        </p>

        <p style={styles.links}>
          LinkedIn: {form.linkedin} | GitHub: {form.github} | Portfolio:{" "}
          {form.portfolio}
        </p>
      </div>

      {/* SUMMARY (IMPORTANT FOR ATS) */}
      <Section title="Professional Summary">
        <p style={styles.text}>
          {form.summary ||
            "Experienced professional with strong technical background in software development and problem solving."}
        </p>
      </Section>

      {/* SKILLS (KEYWORD HEAVY) */}
      <Section title="Core Skills">
        <p style={styles.text}>{form.skills?.join(", ")}</p>
      </Section>

      {/* EXPERIENCE */}
      <Section title="Professional Experience">
        {form.experience?.map((e, i) => (
          <div key={i} style={styles.block}>
            <b>
              {e.role} - {e.company}
            </b>
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
            {p.technologies && (
              <p style={styles.small}>Tech: {p.technologies.join(", ")}</p>
            )}
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
            <p style={styles.text}>{ed.description}</p>
          </div>
        ))}
      </Section>

      {/* OPTIONAL CERTIFICATIONS */}
      {form.certifications && (
        <Section title="Certifications">
          <p style={styles.text}>{form.certifications.join(", ")}</p>
        </Section>
      )}
    </div>
  );
};

/* =========================
   SECTION COMPONENT
========================= */
const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    {children}
  </div>
);

/* =========================
   ATS CLEAN STYLE
========================= */
const styles = {
  page: {
    fontFamily: "Arial",
    padding: "25px",
    maxWidth: "800px",
    margin: "auto",
    background: "#fff",
    color: "#000",
    lineHeight: "1.5",
  },

  header: {
    borderBottom: "2px solid #000",
    paddingBottom: "10px",
    marginBottom: "15px",
  },

  name: {
    fontSize: "26px",
    margin: 0,
  },

  title: {
    fontSize: "14px",
    fontWeight: "bold",
  },

  contact: {
    fontSize: "12px",
  },

  links: {
    fontSize: "12px",
    color: "#333",
  },

  section: {
    marginTop: "15px",
  },

  sectionTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    borderBottom: "1px solid #ddd",
    paddingBottom: "4px",
    marginBottom: "8px",
  },

  block: {
    marginBottom: "10px",
  },

  text: {
    fontSize: "12px",
  },

  small: {
    fontSize: "11px",
    color: "#555",
  },
};

export default AtsProTemplate;
