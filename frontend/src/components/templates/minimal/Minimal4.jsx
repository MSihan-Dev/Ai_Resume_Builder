const Minimal4 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.name}>{form.name || "Your Name"}</h1>

        <p style={styles.contact}>
          {form.email} | {form.phone} | {form.address}
        </p>

        <p style={styles.links}>
          {form.linkedin && `${form.linkedin} | `}
          {form.github && `${form.github} | `}
          {form.portfolio}
        </p>
      </div>

      {/* TITLE */}
      <p style={styles.title}>{form.title || "Software Developer"}</p>

      {/* SUMMARY */}
      <Section title="Summary">
        <p style={styles.text}>
          {form.summary ||
            "Motivated developer with strong problem-solving ability and experience in building modern web applications."}
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
            <b>
              {e.role} — {e.company}
            </b>
            <span style={styles.small}> ({e.duration})</span>
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
            <b>{ed.degree}</b> — {ed.institute}
            <span style={styles.small}> ({ed.year})</span>
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
   STYLES (ULTRA COMPACT)
========================= */
const styles = {
  page: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial",
    background: "#fff",
    color: "#000",
    fontSize: "12px",
    lineHeight: "1.3",
  },

  header: {
    textAlign: "center",
    borderBottom: "1px solid #000",
    paddingBottom: "8px",
    marginBottom: "10px",
  },

  name: {
    fontSize: "22px",
    margin: "0",
  },

  contact: {
    fontSize: "11px",
    margin: "2px 0",
  },

  links: {
    fontSize: "11px",
    margin: "2px 0",
  },

  title: {
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  section: {
    marginBottom: "10px",
  },

  sectionTitle: {
    fontSize: "11px",
    borderBottom: "1px solid #ccc",
    marginBottom: "4px",
  },

  text: {
    fontSize: "11px",
  },

  block: {
    marginBottom: "6px",
  },

  small: {
    fontSize: "10px",
    color: "#555",
  },
};

export default Minimal4;
