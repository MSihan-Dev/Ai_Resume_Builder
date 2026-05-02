const Creative3 = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.name}>{form.name || "Your Name"}</h1>
        <p style={styles.title}>{form.title || "Software Developer"}</p>

        <div style={styles.contact}>
          <span>{form.email}</span>
          <span>{form.phone}</span>
          <span>{form.address}</span>
        </div>
      </div>

      <div style={styles.container}>
        {/* LEFT SIDE */}
        <div style={styles.left}>
          <Section title="Skills">
            <div style={styles.skills}>
              {form.skills?.map((s, i) => (
                <span key={i} style={styles.skill}>
                  {s}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Links">
            <p>{form.linkedin}</p>
            <p>{form.github}</p>
            <p>{form.portfolio}</p>
          </Section>
        </div>

        {/* RIGHT SIDE (TIMELINE) */}
        <div style={styles.right}>
          <Section title="Profile">
            <p style={styles.text}>
              {form.summary ||
                "Motivated developer with experience in building scalable and efficient systems."}
            </p>
          </Section>

          <Section title="Experience Timeline">
            <div style={styles.timeline}>
              {form.experience?.map((e, i) => (
                <div key={i} style={styles.timelineItem}>
                  <div style={styles.dot}></div>

                  <div style={styles.timelineContent}>
                    <b>{e.role}</b>
                    <div style={styles.small}>
                      {e.company} | {e.duration}
                    </div>
                    <p style={styles.text}>{e.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
    </div>
  );
};

/* =========================
   SECTION
========================= */
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "20px" }}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    {children}
  </div>
);

/* =========================
   STYLES (TIMELINE DESIGN)
========================= */
const styles = {
  page: {
    maxWidth: "1000px",
    margin: "auto",
    fontFamily: "Arial",
    background: "#fff",
  },

  header: {
    background: "#0f172a",
    color: "#fff",
    padding: "25px",
    textAlign: "center",
  },

  name: {
    margin: 0,
    fontSize: "26px",
  },

  title: {
    fontSize: "14px",
    marginTop: "5px",
  },

  contact: {
    marginTop: "10px",
    fontSize: "12px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
  },

  left: {
    width: "30%",
  },

  right: {
    width: "70%",
  },

  sectionTitle: {
    fontSize: "14px",
    borderBottom: "2px solid #0f172a",
    marginBottom: "10px",
  },

  text: {
    fontSize: "13px",
    lineHeight: "1.5",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },

  skill: {
    background: "#e2e8f0",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  timeline: {
    position: "relative",
    paddingLeft: "20px",
    borderLeft: "2px solid #0f172a",
  },

  timelineItem: {
    position: "relative",
    marginBottom: "15px",
  },

  dot: {
    position: "absolute",
    left: "-6px",
    top: "5px",
    width: "10px",
    height: "10px",
    background: "#0f172a",
    borderRadius: "50%",
  },

  timelineContent: {
    paddingLeft: "10px",
  },

  block: {
    marginBottom: "10px",
  },

  small: {
    fontSize: "12px",
    color: "#555",
  },
};

export default Creative3;
