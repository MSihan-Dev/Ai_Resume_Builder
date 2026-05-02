const Modern1 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.name}>{form.name || "Your Name"}</h1>
          <p style={styles.title}>{form.title || "Web Developer"}</p>
        </div>

        <div style={styles.contact}>
          <p>{form.email}</p>
          <p>{form.phone}</p>
          <p>{form.address}</p>
        </div>
      </div>

      {/* LINKS BAR */}
      <div style={styles.links}>
        {form.linkedin && <span>LinkedIn: {form.linkedin}</span>}
        {form.github && <span>GitHub: {form.github}</span>}
        {form.portfolio && <span>Portfolio: {form.portfolio}</span>}
      </div>

      {/* SUMMARY */}
      <Section title="Professional Summary">
        <p style={styles.text}>
          {form.summary ||
            "Motivated software developer with experience in building scalable web applications and modern UI systems."}
        </p>
      </Section>

      {/* SKILLS */}
      <Section title="Technical Skills">
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
              <span>{e.company}</span>
            </div>
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
            {p.link && (
              <a style={styles.link} href={p.link}>
                View Project
              </a>
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
   MODERN CLEAN A4 STYLE
========================= */
const styles = {
  page: {
    fontFamily: "Arial",
    maxWidth: "800px",
    margin: "auto",
    padding: "25px",
    background: "#fff",
    color: "#111",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "2px solid #2563eb",
    paddingBottom: "10px",
  },

  name: {
    fontSize: "28px",
    margin: 0,
  },

  title: {
    color: "#2563eb",
    marginTop: "5px",
  },

  contact: {
    fontSize: "12px",
    textAlign: "right",
  },

  links: {
    display: "flex",
    gap: "15px",
    fontSize: "12px",
    marginTop: "10px",
    color: "#555",
  },

  section: {
    marginTop: "15px",
  },

  sectionTitle: {
    fontSize: "14px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
    marginBottom: "10px",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },

  skill: {
    background: "#2563eb",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "15px",
    fontSize: "12px",
  },

  block: {
    marginBottom: "10px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
  },

  text: {
    fontSize: "13px",
    marginTop: "4px",
  },

  small: {
    fontSize: "12px",
    color: "#666",
  },

  link: {
    fontSize: "12px",
    color: "#2563eb",
  },
};

export default Modern1;
