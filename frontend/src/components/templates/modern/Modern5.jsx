const Modern5 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.name}>{form.name || "Your Name"}</h1>
          <p style={styles.title}>{form.title || "Software Developer"}</p>
        </div>

        <div style={styles.contact}>
          <p>{form.email}</p>
          <p>{form.phone}</p>
          <p>{form.address}</p>
        </div>
      </div>

      {/* LINKS */}
      <div style={styles.links}>
        {form.linkedin && <span>{form.linkedin}</span>}
        {form.github && <span>{form.github}</span>}
        {form.portfolio && <span>{form.portfolio}</span>}
      </div>

      {/* SUMMARY */}
      <Section title="Summary">
        <p style={styles.text}>
          {form.summary ||
            "Results-driven developer with experience in building scalable full-stack applications and clean UI systems."}
        </p>
      </Section>

      {/* TWO COLUMN LAYOUT */}
      <div style={styles.grid}>
        {/* LEFT */}
        <div>
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

        {/* RIGHT */}
        <div>
          {/* EXPERIENCE */}
          <Section title="Experience">
            {form.experience?.map((e, i) => (
              <div key={i} style={styles.block}>
                <b>{e.role}</b>
                <div style={styles.small}>
                  {e.company} | {e.duration}
                </div>
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
        </div>
      </div>
    </div>
  );
};

/* =========================
   SECTION
========================= */
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "12px" }}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    {children}
  </div>
);

/* =========================
   STYLES (ATS CLEAN)
========================= */
const styles = {
  page: {
    maxWidth: "850px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial",
    background: "#fff",
    color: "#111",
    fontSize: "13px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #000",
    paddingBottom: "10px",
  },

  name: {
    fontSize: "24px",
    margin: 0,
  },

  title: {
    fontSize: "13px",
    color: "#444",
  },

  contact: {
    textAlign: "right",
    fontSize: "12px",
  },

  links: {
    marginTop: "8px",
    fontSize: "12px",
    color: "#333",
    display: "flex",
    gap: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "15px",
  },

  sectionTitle: {
    fontSize: "12px",
    borderBottom: "1px solid #ddd",
    marginBottom: "5px",
    paddingBottom: "3px",
  },

  text: {
    fontSize: "12px",
    lineHeight: "1.4",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
  },

  skill: {
    background: "#f3f4f6",
    padding: "3px 8px",
    borderRadius: "10px",
    fontSize: "11px",
  },

  block: {
    marginBottom: "8px",
  },

  small: {
    fontSize: "11px",
    color: "#555",
  },
};

export default Modern5;
