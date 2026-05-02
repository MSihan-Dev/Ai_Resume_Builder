const Modern2 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* LEFT SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.name}>{form.name || "Your Name"}</h2>
        <p style={styles.title}>{form.title || "Web Developer"}</p>

        <Divider />

        {/* CONTACT */}
        <Section title="Contact">
          <p>{form.email}</p>
          <p>{form.phone}</p>
          <p>{form.address}</p>
        </Section>

        {/* LINKS */}
        <Section title="Links">
          {form.linkedin && <p>LinkedIn</p>}
          {form.github && <p>GitHub</p>}
          {form.portfolio && <p>Portfolio</p>}
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
      </div>

      {/* RIGHT CONTENT */}
      <div style={styles.content}>
        {/* SUMMARY */}
        <Section title="Profile Summary">
          <p style={styles.text}>
            {form.summary ||
              "Passionate developer focused on building scalable and modern web applications."}
          </p>
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

        {/* PROJECTS */}
        <Section title="Projects">
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
      </div>
    </div>
  );
};

/* =========================
   REUSABLE SECTION
========================= */
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "20px" }}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    {children}
  </div>
);

const Divider = () => (
  <div style={{ height: "1px", background: "#444", margin: "10px 0" }} />
);

/* =========================
   STYLES (SIDEBAR DESIGN)
========================= */
const styles = {
  page: {
    display: "flex",
    maxWidth: "900px",
    margin: "auto",
    fontFamily: "Arial",
    background: "#fff",
    color: "#111",
    borderRadius: "10px",
    overflow: "hidden",
  },

  sidebar: {
    width: "30%",
    background: "#1e3a8a",
    color: "#fff",
    padding: "20px",
  },

  content: {
    width: "70%",
    padding: "20px",
  },

  name: {
    fontSize: "22px",
    marginBottom: "5px",
  },

  title: {
    fontSize: "13px",
    opacity: 0.9,
  },

  sectionTitle: {
    fontSize: "13px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "4px",
    marginBottom: "10px",
  },

  text: {
    fontSize: "13px",
    lineHeight: "1.4",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },

  skill: {
    background: "#3b82f6",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "11px",
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
    color: "#555",
  },
};

export default Modern2;
