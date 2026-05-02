const Modern3 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.name}>{form.name || "Your Name"}</h1>
          <p style={styles.title}>{form.title || "Full Stack Developer"}</p>
        </div>

        <div style={styles.contact}>
          <p>{form.email}</p>
          <p>{form.phone}</p>
          <p>{form.address}</p>
        </div>
      </div>

      {/* LINKS BAR */}
      <div style={styles.links}>
        {form.linkedin && <span>🔗 LinkedIn</span>}
        {form.github && <span>💻 GitHub</span>}
        {form.portfolio && <span>🌐 Portfolio</span>}
      </div>

      {/* SUMMARY */}
      <Section title="About">
        <p style={styles.text}>
          {form.summary ||
            "Software developer focused on building scalable full-stack applications using modern web technologies."}
        </p>
      </Section>

      {/* SKILLS (DEV STYLE TAG GRID) */}
      <Section title="Tech Stack">
        <div style={styles.skills}>
          {form.skills?.map((s, i) => (
            <span key={i} style={styles.skill}>
              {s}
            </span>
          ))}
        </div>
      </Section>

      {/* PROJECTS (MAIN FOCUS HERE) */}
      <Section title="Projects">
        {form.projects?.map((p, i) => (
          <div key={i} style={styles.projectCard}>
            <div style={styles.projectHeader}>
              <b>{p.name}</b>
              {p.link && <a href={p.link}>View</a>}
            </div>

            <p style={styles.text}>{p.description}</p>

            {p.tech && (
              <div style={styles.techRow}>
                {p.tech.map((t, idx) => (
                  <span key={idx} style={styles.tech}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
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
   STYLES (DEV DASHBOARD LOOK)
========================= */
const styles = {
  page: {
    maxWidth: "900px",
    margin: "auto",
    padding: "25px",
    fontFamily: "Arial",
    background: "#0f172a",
    color: "#e2e8f0",
    borderRadius: "10px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #334155",
    paddingBottom: "10px",
  },

  name: {
    fontSize: "26px",
    margin: 0,
  },

  title: {
    color: "#38bdf8",
    marginTop: "5px",
  },

  contact: {
    fontSize: "12px",
    textAlign: "right",
    color: "#94a3b8",
  },

  links: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
    fontSize: "13px",
    color: "#38bdf8",
  },

  section: {
    marginTop: "18px",
  },

  sectionTitle: {
    fontSize: "13px",
    color: "#f8fafc",
    borderBottom: "1px solid #334155",
    paddingBottom: "5px",
  },

  text: {
    fontSize: "13px",
    color: "#cbd5e1",
    lineHeight: "1.5",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "8px",
  },

  skill: {
    background: "#1e293b",
    color: "#38bdf8",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
  },

  projectCard: {
    background: "#1e293b",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
  },

  projectHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px",
  },

  techRow: {
    display: "flex",
    gap: "6px",
    marginTop: "5px",
    flexWrap: "wrap",
  },

  tech: {
    fontSize: "11px",
    background: "#334155",
    padding: "3px 8px",
    borderRadius: "10px",
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
    color: "#94a3b8",
  },
};

export default Modern3;
