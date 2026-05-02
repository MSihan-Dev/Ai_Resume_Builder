const Modern4 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.name}>{form.name || "Your Name"}</h1>
          <p style={styles.title}>{form.title || "Software Engineer"}</p>
        </div>

        <div style={styles.contact}>
          <p>{form.email}</p>
          <p>{form.phone}</p>
          <p>{form.address}</p>
        </div>
      </div>

      {/* LINKS */}
      <div style={styles.links}>
        {form.linkedin && <span>LinkedIn</span>}
        {form.github && <span>GitHub</span>}
        {form.portfolio && <span>Portfolio</span>}
      </div>

      {/* SUMMARY */}
      <Section title="Professional Summary">
        <p style={styles.text}>
          {form.summary ||
            "Dedicated developer with strong problem-solving skills and experience in full-stack web development."}
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

      {/* EXPERIENCE TIMELINE */}
      <Section title="Experience">
        <div style={styles.timeline}>
          {form.experience?.map((e, i) => (
            <div key={i} style={styles.timelineItem}>
              <div style={styles.dot}></div>

              <div style={styles.timelineContent}>
                <div style={styles.row}>
                  <b>{e.role}</b>
                  <span style={styles.small}>{e.duration}</span>
                </div>

                <div style={styles.company}>{e.company}</div>

                <p style={styles.text}>{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        {form.projects?.map((p, i) => (
          <div key={i} style={styles.project}>
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
   STYLES (TIMELINE CV)
========================= */
const styles = {
  page: {
    maxWidth: "900px",
    margin: "auto",
    padding: "25px",
    fontFamily: "Arial",
    background: "#ffffff",
    color: "#111",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "2px solid #0ea5e9",
    paddingBottom: "10px",
  },

  name: {
    fontSize: "28px",
    margin: 0,
  },

  title: {
    color: "#0ea5e9",
  },

  contact: {
    fontSize: "12px",
    textAlign: "right",
    color: "#555",
  },

  links: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
    fontSize: "12px",
    color: "#0ea5e9",
  },

  section: {
    marginTop: "18px",
  },

  sectionTitle: {
    fontSize: "13px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
  },

  text: {
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#333",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },

  skill: {
    background: "#0ea5e9",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
  },

  /* TIMELINE */
  timeline: {
    position: "relative",
    marginLeft: "10px",
    borderLeft: "2px solid #e5e7eb",
    paddingLeft: "15px",
  },

  timelineItem: {
    position: "relative",
    marginBottom: "15px",
  },

  dot: {
    position: "absolute",
    left: "-22px",
    top: "5px",
    width: "10px",
    height: "10px",
    background: "#0ea5e9",
    borderRadius: "50%",
  },

  timelineContent: {
    paddingLeft: "5px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
  },

  company: {
    fontSize: "12px",
    color: "#555",
    marginBottom: "5px",
  },

  project: {
    marginBottom: "10px",
  },

  block: {
    marginBottom: "10px",
  },

  small: {
    fontSize: "12px",
    color: "#666",
  },
};

export default Modern4;
