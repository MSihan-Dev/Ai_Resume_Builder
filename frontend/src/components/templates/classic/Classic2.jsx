const Classic2 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.name}>{form.name || "Your Name"}</h1>

        <p style={styles.contact}>
          {form.email} | {form.phone} <br />
          {form.address}
        </p>
      </div>

      {/* TITLE */}
      <p style={styles.title}>
        {form.title || "Applying for Software Developer Position"}
      </p>

      {/* SUMMARY */}
      <Section title="Professional Summary">
        <p style={styles.text}>
          {form.summary ||
            "Results-driven individual with strong technical background and ability to solve real-world problems."}
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
      <Section title="Work Experience">
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

      {/* LINKS */}
      <Section title="Links">
        <p style={styles.text}>
          {form.linkedin && `LinkedIn: ${form.linkedin}`} <br />
          {form.github && `GitHub: ${form.github}`} <br />
          {form.portfolio && `Portfolio: ${form.portfolio}`}
        </p>
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
   STYLES (LEFT CLASSIC)
========================= */
const styles = {
  page: {
    maxWidth: "850px",
    margin: "auto",
    padding: "30px",
    fontFamily: "Times New Roman",
    background: "#fff",
    color: "#000",
    lineHeight: "1.6",
  },

  header: {
    marginBottom: "10px",
  },

  name: {
    fontSize: "26px",
    margin: 0,
  },

  contact: {
    fontSize: "13px",
    color: "#333",
  },

  title: {
    fontSize: "14px",
    marginBottom: "15px",
    color: "#222",
  },

  section: {
    marginBottom: "15px",
  },

  sectionTitle: {
    fontSize: "15px",
    borderBottom: "1px solid #000",
    marginBottom: "6px",
  },

  text: {
    fontSize: "13px",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  skill: {
    border: "1px solid #000",
    padding: "3px 8px",
    fontSize: "12px",
  },

  block: {
    marginBottom: "10px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
  },

  small: {
    fontSize: "12px",
    color: "#444",
  },
};

export default Classic2;
