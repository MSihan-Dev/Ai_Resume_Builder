const ATS3 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <h1 style={styles.name}>{form.name || "Your Name"}</h1>

      <p style={styles.contact}>
        {form.title} | {form.email} | {form.phone}
      </p>

      <p style={styles.contact}>
        {form.address} | {form.linkedin} | {form.github}
      </p>

      {/* SUMMARY */}
      <Section title="Professional Summary">
        <p>
          {form.summary || "Brief summary highlighting your key strengths."}
        </p>
      </Section>

      {/* SKILLS */}
      <Section title="Technical Skills">
        <ul style={styles.list}>
          {form.skills?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience">
        {form.experience?.map((e, i) => (
          <div key={i} style={styles.block}>
            <b>{e.role}</b>
            <div style={styles.sub}>
              {e.company} | {e.duration}
            </div>

            <ul style={styles.list}>
              {e.description
                ?.split(".")
                .filter(Boolean)
                .map((point, idx) => (
                  <li key={idx}>{point.trim()}</li>
                ))}
            </ul>
          </div>
        ))}
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        {form.projects?.map((p, i) => (
          <div key={i} style={styles.block}>
            <b>{p.name}</b>

            <ul style={styles.list}>
              {p.description
                ?.split(".")
                .filter(Boolean)
                .map((point, idx) => (
                  <li key={idx}>{point.trim()}</li>
                ))}
            </ul>
          </div>
        ))}
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        {form.education?.map((ed, i) => (
          <div key={i} style={styles.block}>
            <b>{ed.degree}</b>
            <div style={styles.sub}>
              {ed.institute} | {ed.year}
            </div>
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
    <h3 style={styles.heading}>{title}</h3>
    {children}
  </div>
);

/* =========================
   STYLES (BULLET ATS)
========================= */
const styles = {
  page: {
    maxWidth: "800px",
    margin: "auto",
    padding: "25px",
    fontFamily: "Arial",
    fontSize: "13px",
    color: "#000",
    background: "#fff",
    lineHeight: "1.5",
  },

  name: {
    fontSize: "22px",
    marginBottom: "5px",
  },

  contact: {
    fontSize: "12px",
    marginBottom: "6px",
  },

  section: {
    marginTop: "12px",
  },

  heading: {
    fontSize: "14px",
    borderBottom: "1px solid #000",
    marginBottom: "5px",
  },

  block: {
    marginBottom: "10px",
  },

  sub: {
    fontSize: "12px",
    marginBottom: "4px",
  },

  list: {
    paddingLeft: "18px",
    margin: 0,
  },
};

export default ATS3;
