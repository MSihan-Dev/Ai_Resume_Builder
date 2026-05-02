const ATS4 = ({ form }) => {
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
          {form.summary ||
            "Detail-oriented professional with strong technical and problem-solving skills."}
        </p>
      </Section>

      {/* SKILLS */}
      <Section title="Technical Skills">
        <ul>
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
            <div>
              {e.company} | {e.duration}
            </div>
            <p>{e.description}</p>
          </div>
        ))}
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        {form.projects?.map((p, i) => (
          <div key={i} style={styles.block}>
            <b>{p.name}</b>
            <p>{p.description}</p>
          </div>
        ))}
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        {form.education?.map((ed, i) => (
          <div key={i} style={styles.block}>
            <b>{ed.degree}</b>
            <div>
              {ed.institute} | {ed.year}
            </div>
          </div>
        ))}
      </Section>

      {/* CERTIFICATIONS */}
      <Section title="Certifications">
        {form.certifications?.length ? (
          <ul>
            {form.certifications.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        ) : (
          <p>No certifications added</p>
        )}
      </Section>

      {/* ACHIEVEMENTS */}
      <Section title="Achievements">
        {form.achievements?.length ? (
          <ul>
            {form.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        ) : (
          <p>No achievements listed</p>
        )}
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
   STYLES (ATS + HR READY)
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
};

export default ATS4;
