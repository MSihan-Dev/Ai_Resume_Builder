const Creative1 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* LEFT SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarName}>{form.name || "Your Name"}</h2>
        <p style={styles.sidebarTitle}>{form.title || "Web Developer"}</p>

        <Section title="Contact">
          <p>{form.email}</p>
          <p>{form.phone}</p>
          <p>{form.address}</p>
        </Section>

        <Section title="Links">
          <p>{form.linkedin}</p>
          <p>{form.github}</p>
          <p>{form.portfolio}</p>
        </Section>

        <Section title="Skills">
          <ul style={styles.skillList}>
            {form.skills?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Section>
      </div>

      {/* RIGHT CONTENT */}
      <div style={styles.content}>
        <Section title="Profile">
          <p style={styles.text}>
            {form.summary ||
              "Creative and detail-oriented developer with passion for building modern applications."}
          </p>
        </Section>

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
    </div>
  );
};

/* =========================
   SECTION
========================= */
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "15px" }}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    {children}
  </div>
);

/* =========================
   STYLES (CREATIVE SIDEBAR)
========================= */
const styles = {
  page: {
    display: "flex",
    maxWidth: "1000px",
    margin: "auto",
    background: "#fff",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "30%",
    background: "#1e293b",
    color: "#fff",
    padding: "20px",
  },

  sidebarName: {
    margin: 0,
    fontSize: "22px",
  },

  sidebarTitle: {
    fontSize: "13px",
    marginBottom: "15px",
    color: "#cbd5f5",
  },

  content: {
    width: "70%",
    padding: "20px",
  },

  sectionTitle: {
    fontSize: "14px",
    borderBottom: "1px solid #ccc",
    marginBottom: "5px",
  },

  text: {
    fontSize: "13px",
    lineHeight: "1.5",
  },

  block: {
    marginBottom: "12px",
  },

  small: {
    fontSize: "12px",
    color: "#555",
  },

  skillList: {
    paddingLeft: "15px",
    fontSize: "13px",
  },
};

export default Creative1;
