const MinimalTemplate = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.name}>{form.name || "Your Name"}</h1>
        <p style={styles.title}>{form.title || "Job Title"}</p>

        <p style={styles.contact}>
          {form.email} | {form.phone} | {form.address}
        </p>

        <p style={styles.links}>
          {form.linkedin && <span>LinkedIn: {form.linkedin}</span>}
          <br />
          {form.github && <span>GitHub: {form.github}</span>}
          <br />
          {form.portfolio && <span>Portfolio: {form.portfolio}</span>}
        </p>
      </div>

      {/* SKILLS */}
      <Section title="Skills">
        <p style={styles.text}>{form.skills?.join(" • ")}</p>
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience">
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
            {p.link && <p style={styles.small}>{p.link}</p>}
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
   MINIMAL ATS STYLE
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
    borderBottom: "1px solid #000",
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
    fontSize: "11px",
    color: "#333",
  },

  section: {
    marginTop: "15px",
  },

  sectionTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    borderBottom: "1px solid #ddd",
    marginBottom: "6px",
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

export default MinimalTemplate;
