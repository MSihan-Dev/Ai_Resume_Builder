const Minimal2 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.name}>{form.name || "Your Name"}</h1>
          <p style={styles.title}>{form.title || "Professional Title"}</p>
        </div>

        <div style={styles.contact}>
          <p>{form.email}</p>
          <p>{form.phone}</p>
          <p>{form.address}</p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={styles.grid}>
        {/* LEFT SIDE */}
        <div>
          <Section title="Summary">
            <p style={styles.text}>
              {form.summary ||
                "Dedicated professional with strong technical background and problem-solving mindset."}
            </p>
          </Section>

          <Section title="Skills">
            <div style={styles.skills}>
              {form.skills?.map((s, i) => (
                <span key={i} style={styles.skill}>
                  {s}
                </span>
              ))}
            </div>
          </Section>

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

        {/* RIGHT SIDE */}
        <div>
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
  <div style={styles.section}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    {children}
  </div>
);

/* =========================
   STYLES (EU CLEAN CV)
========================= */
const styles = {
  page: {
    maxWidth: "900px",
    margin: "auto",
    padding: "25px",
    fontFamily: "Arial",
    background: "#fff",
    color: "#111",
    fontSize: "13px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "2px solid #111",
    paddingBottom: "10px",
  },

  name: {
    fontSize: "26px",
    margin: 0,
  },

  title: {
    fontSize: "13px",
    color: "#555",
  },

  contact: {
    textAlign: "right",
    fontSize: "12px",
    color: "#444",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
    marginTop: "15px",
  },

  section: {
    marginBottom: "15px",
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
    background: "#f1f1f1",
    padding: "3px 8px",
    borderRadius: "10px",
    fontSize: "11px",
  },

  block: {
    marginBottom: "10px",
  },

  small: {
    fontSize: "11px",
    color: "#666",
  },
};

export default Minimal2;
