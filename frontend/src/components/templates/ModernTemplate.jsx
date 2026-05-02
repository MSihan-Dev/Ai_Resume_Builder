const ModernTemplate = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.name}>{form.name || "Your Name"}</h1>
        <p style={styles.title}>{form.title || "Professional Title"}</p>

        <div style={styles.contact}>
          <p>{form.email}</p>
          <p>{form.phone}</p>
          <p>{form.address}</p>
        </div>

        <div style={styles.links}>
          {form.linkedin && <a href={form.linkedin}>LinkedIn</a>}
          {form.github && <a href={form.github}>GitHub</a>}
          {form.portfolio && <a href={form.portfolio}>Portfolio</a>}
        </div>
      </div>

      {/* SECTION: SKILLS */}
      <Section title="Skills">
        <div style={styles.skillWrap}>
          {form.skills?.map((s, i) => (
            <span key={i} style={styles.skill}>
              {s}
            </span>
          ))}
        </div>
      </Section>

      {/* SECTION: EXPERIENCE */}
      <Section title="Experience">
        {form.experience?.map((e, i) => (
          <div key={i} style={styles.block}>
            <div style={styles.row}>
              <b>{e.role}</b>
              <span style={styles.company}>{e.company}</span>
            </div>
            <div style={styles.duration}>{e.duration}</div>
            <p style={styles.text}>{e.description}</p>
          </div>
        ))}
      </Section>

      {/* SECTION: PROJECTS */}
      <Section title="Projects">
        {form.projects?.map((p, i) => (
          <div key={i} style={styles.block}>
            <b>{p.name}</b>
            <p style={styles.text}>{p.description}</p>
            {p.link && (
              <a href={p.link} style={styles.link}>
                View Project
              </a>
            )}
          </div>
        ))}
      </Section>

      {/* SECTION: EDUCATION */}
      <Section title="Education">
        {form.education?.map((ed, i) => (
          <div key={i} style={styles.block}>
            <b>{ed.degree}</b>
            <div style={styles.company}>{ed.institute}</div>
            <div style={styles.duration}>{ed.year}</div>
            <p style={styles.text}>{ed.description}</p>
          </div>
        ))}
      </Section>
    </div>
  );
};

/* =========================
   REUSABLE SECTION COMPONENT
========================= */
const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    {children}
  </div>
);

/* =========================
   STYLES (MODERN CLEAN CV)
========================= */
const styles = {
  page: {
    fontFamily: "Arial",
    padding: "25px",
    maxWidth: "800px",
    margin: "auto",
    background: "#fff",
    color: "#111",
  },

  header: {
    borderBottom: "2px solid #2563eb",
    marginBottom: "15px",
    paddingBottom: "10px",
  },

  name: {
    fontSize: "28px",
    margin: 0,
  },

  title: {
    color: "#2563eb",
    fontWeight: "bold",
    marginTop: "5px",
  },

  contact: {
    fontSize: "12px",
    color: "#555",
  },

  links: {
    fontSize: "12px",
    marginTop: "5px",
    display: "flex",
    gap: "10px",
  },

  section: {
    marginTop: "15px",
  },

  sectionTitle: {
    fontSize: "16px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "3px",
    marginBottom: "8px",
  },

  skillWrap: {
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

  company: {
    fontSize: "13px",
    color: "#444",
  },

  duration: {
    fontSize: "12px",
    color: "gray",
  },

  text: {
    fontSize: "13px",
    marginTop: "4px",
    color: "#333",
  },

  link: {
    fontSize: "12px",
    color: "#2563eb",
  },
};

export default ModernTemplate;
