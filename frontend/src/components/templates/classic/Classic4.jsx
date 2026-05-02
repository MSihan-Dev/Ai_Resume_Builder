const Classic4 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.name}>{form.name || "Your Name"}</h1>
        <p style={styles.contact}>
          {form.email} | {form.phone} <br />
          {form.address}
        </p>
      </div>

      {/* TITLE */}
      <p style={styles.title}>{form.title || "Curriculum Vitae"}</p>

      {/* SUMMARY */}
      <Section title="Profile">
        <p style={styles.text}>
          {form.summary ||
            "Dedicated academic-oriented individual with strong research and analytical skills."}
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
      <Section title="Professional Experience">
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
      <Section title="Research / Projects">
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

      {/* ADDITIONAL (IMPORTANT FOR ACADEMIC CV) */}
      <Section title="Additional Information">
        <ul style={styles.list}>
          <li>Languages: English, Tamil, Sinhala</li>
          <li>Interests: Technology, Research, Development</li>
          <li>Availability: Immediate</li>
        </ul>
      </Section>

      {/* LINKS */}
      <Section title="References">
        <p style={styles.text}>Available upon request.</p>
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
   STYLES (ACADEMIC STYLE)
========================= */
const styles = {
  page: {
    maxWidth: "850px",
    margin: "auto",
    padding: "30px",
    fontFamily: "Times New Roman",
    background: "#fff",
    color: "#000",
    lineHeight: "1.6",
  },

  header: {
    marginBottom: "10px",
  },

  name: {
    fontSize: "26px",
    margin: 0,
  },

  contact: {
    fontSize: "13px",
  },

  title: {
    fontSize: "14px",
    marginBottom: "15px",
  },

  section: {
    marginBottom: "15px",
  },

  sectionTitle: {
    fontSize: "15px",
    borderBottom: "1px solid #000",
    marginBottom: "6px",
  },

  text: {
    fontSize: "13px",
  },

  list: {
    paddingLeft: "20px",
    fontSize: "13px",
  },

  block: {
    marginBottom: "10px",
  },

  small: {
    fontSize: "12px",
    color: "#444",
  },
};

export default Classic4;
