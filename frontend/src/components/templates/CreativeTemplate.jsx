const CreativeTemplate = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* LEFT SIDEBAR */}
      <div style={styles.sidebar}>
        <h1 style={styles.name}>{form.name || "Your Name"}</h1>
        <p style={styles.title}>{form.title || "Creative Role"}</p>

        <div style={styles.section}>
          <h3>Contact</h3>
          <p>{form.email}</p>
          <p>{form.phone}</p>
          <p>{form.address}</p>
        </div>

        <div style={styles.section}>
          <h3>Links</h3>
          <p>{form.linkedin}</p>
          <p>{form.github}</p>
          <p>{form.portfolio}</p>
        </div>

        <div style={styles.section}>
          <h3>Skills</h3>
          {form.skills?.map((s, i) => (
            <span key={i} style={styles.skill}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div style={styles.content}>
        {/* EXPERIENCE */}
        <Section title="Experience">
          {form.experience?.map((e, i) => (
            <div key={i} style={styles.block}>
              <h4>
                {e.role} @ {e.company}
              </h4>
              <p style={styles.small}>{e.duration}</p>
              <p>{e.description}</p>
            </div>
          ))}
        </Section>

        {/* PROJECTS */}
        <Section title="Projects">
          {form.projects?.map((p, i) => (
            <div key={i} style={styles.block}>
              <h4>{p.name}</h4>
              <p>{p.description}</p>
              {p.link && <a href={p.link}>View Project</a>}
            </div>
          ))}
        </Section>

        {/* EDUCATION */}
        <Section title="Education">
          {form.education?.map((ed, i) => (
            <div key={i} style={styles.block}>
              <h4>{ed.degree}</h4>
              <p style={styles.small}>{ed.institute}</p>
              <p style={styles.small}>{ed.year}</p>
              <p>{ed.description}</p>
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
};

/* =========================
   SECTION COMPONENT
========================= */
const Section = ({ title, children }) => (
  <div style={styles.sectionBlock}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    {children}
  </div>
);

/* =========================
   CREATIVE STYLE
========================= */
const styles = {
  page: {
    display: "flex",
    fontFamily: "Arial",
    maxWidth: "900px",
    margin: "auto",
    background: "#fff",
    color: "#111",
  },

  sidebar: {
    width: "35%",
    background: "#1f2937",
    color: "#fff",
    padding: "20px",
  },

  content: {
    width: "65%",
    padding: "20px",
  },

  name: {
    fontSize: "24px",
    marginBottom: "5px",
  },

  title: {
    color: "#93c5fd",
    marginBottom: "20px",
  },

  section: {
    marginTop: "20px",
  },

  skill: {
    display: "inline-block",
    background: "#2563eb",
    padding: "4px 8px",
    margin: "3px",
    borderRadius: "10px",
    fontSize: "12px",
  },

  sectionBlock: {
    marginBottom: "20px",
  },

  sectionTitle: {
    borderBottom: "2px solid #2563eb",
    paddingBottom: "5px",
    marginBottom: "10px",
  },

  block: {
    marginBottom: "10px",
  },

  small: {
    fontSize: "12px",
    color: "#555",
  },
};

export default CreativeTemplate;
