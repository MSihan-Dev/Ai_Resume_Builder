const ATS1 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* NAME */}
      <h1 style={styles.name}>{form.name || "Your Name"}</h1>

      {/* TITLE */}
      <p style={styles.title}>{form.title || "Software Developer"}</p>

      {/* CONTACT */}
      <p style={styles.contact}>
        {form.email} | {form.phone} | {form.address}
      </p>

      <p style={styles.contact}>
        {form.linkedin} | {form.github} | {form.portfolio}
      </p>

      {/* SUMMARY */}
      <Section title="Professional Summary">
        <p>{form.summary || "Write a short professional summary here."}</p>
      </Section>

      {/* SKILLS */}
      <Section title="Skills">
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
            <ul>
              <li>{e.description}</li>
            </ul>
          </div>
        ))}
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        {form.projects?.map((p, i) => (
          <div key={i} style={styles.block}>
            <b>{p.name}</b>
            <ul>
              <li>{p.description}</li>
            </ul>
          </div>
        ))}
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        {form.education?.map((ed, i) => (
          <div key={i} style={styles.block}>
            <b>{ed.degree}</b>
            <div>{ed.institute}</div>
            <div>{ed.year}</div>
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
   STYLES (ATS SAFE)
========================= */
const styles = {
  page: {
    maxWidth: "800px",
    margin: "auto",
    padding: "25px",
    fontFamily: "Arial",
    color: "#000",
    background: "#fff",
    lineHeight: "1.6",
  },

  name: {
    fontSize: "24px",
    marginBottom: "5px",
  },

  title: {
    fontSize: "14px",
    marginBottom: "5px",
  },

  contact: {
    fontSize: "12px",
    marginBottom: "10px",
  },

  section: {
    marginTop: "15px",
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

export default ATS1;
