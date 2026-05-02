const Classic1 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.name}>{form.name || "Your Name"}</h1>

        <p style={styles.contact}>
          {form.address} <br />
          {form.phone} | {form.email}
        </p>
      </div>

      {/* TITLE */}
      <p style={styles.title}>
        {form.title || "Applying for Web Developer Position"}
      </p>

      {/* SUMMARY */}
      <Section title="Objective">
        <p style={styles.text}>
          {form.summary ||
            "To obtain a challenging position where I can apply my skills and grow professionally."}
        </p>
      </Section>

      {/* SKILLS */}
      <Section title="Skills">
        <ul style={styles.list}>
          {form.skills?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </Section>

      {/* EXPERIENCE */}
      <Section title="Work Experience">
        {form.experience?.map((e, i) => (
          <div key={i} style={styles.block}>
            <b>{e.role}</b> <br />
            <span style={styles.small}>{e.company}</span> <br />
            <span style={styles.small}>{e.duration}</span>
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
   STYLES (CLASSIC FORMAL)
========================= */
const styles = {
  page: {
    maxWidth: "800px",
    margin: "auto",
    padding: "30px",
    fontFamily: "Times New Roman",
    background: "#fff",
    color: "#000",
    lineHeight: "1.6",
  },

  header: {
    textAlign: "center",
    marginBottom: "10px",
  },

  name: {
    fontSize: "28px",
    margin: 0,
  },

  contact: {
    fontSize: "14px",
  },

  title: {
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "15px",
  },

  section: {
    marginBottom: "15px",
  },

  sectionTitle: {
    fontSize: "16px",
    borderBottom: "1px solid #000",
    marginBottom: "5px",
  },

  text: {
    fontSize: "14px",
  },

  list: {
    paddingLeft: "20px",
  },

  block: {
    marginBottom: "10px",
  },

  small: {
    fontSize: "13px",
  },
};

export default Classic1;
