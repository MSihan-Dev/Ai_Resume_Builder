const ClassicTemplate = ({ form }) => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.name}>{form.name || "Your Name"}</h1>
        <p style={styles.title}>{form.title || "Professional Title"}</p>

        <p style={styles.contact}>
          {form.email} | {form.phone} | {form.address}
        </p>

        <p style={styles.links}>
          LinkedIn: {form.linkedin} <br />
          GitHub: {form.github} <br />
          Portfolio: {form.portfolio}
        </p>
      </div>

      {/* SUMMARY STYLE SECTION */}
      <Box title="Skills">
        <p style={styles.text}>{form.skills?.join(" | ")}</p>
      </Box>

      {/* EXPERIENCE */}
      <Box title="Work Experience">
        {form.experience?.map((e, i) => (
          <div key={i} style={styles.block}>
            <b>{e.role}</b> — {e.company}
            <div style={styles.small}>{e.duration}</div>
            <p style={styles.text}>{e.description}</p>
          </div>
        ))}
      </Box>

      {/* PROJECTS */}
      <Box title="Projects">
        {form.projects?.map((p, i) => (
          <div key={i} style={styles.block}>
            <b>{p.name}</b>
            <p style={styles.text}>{p.description}</p>
            {p.link && <p style={styles.small}>{p.link}</p>}
          </div>
        ))}
      </Box>

      {/* EDUCATION */}
      <Box title="Education">
        {form.education?.map((ed, i) => (
          <div key={i} style={styles.block}>
            <b>{ed.degree}</b>
            <div style={styles.small}>{ed.institute}</div>
            <div style={styles.small}>{ed.year}</div>
            <p style={styles.text}>{ed.description}</p>
          </div>
        ))}
      </Box>
    </div>
  );
};

/* =========================
   BOX COMPONENT (CLASSIC STYLE)
========================= */
const Box = ({ title, children }) => (
  <div style={styles.box}>
    <h3 style={styles.boxTitle}>{title}</h3>
    {children}
  </div>
);

/* =========================
   CLASSIC STYLES
========================= */
const styles = {
  page: {
    fontFamily: "Times New Roman",
    padding: "25px",
    maxWidth: "800px",
    margin: "auto",
    background: "#fff",
    color: "#000",
  },

  header: {
    textAlign: "center",
    borderBottom: "2px solid black",
    marginBottom: "15px",
    paddingBottom: "10px",
  },

  name: {
    fontSize: "28px",
    margin: 0,
  },

  title: {
    fontSize: "14px",
    fontStyle: "italic",
  },

  contact: {
    fontSize: "12px",
    marginTop: "5px",
  },

  links: {
    fontSize: "12px",
    marginTop: "5px",
  },

  box: {
    border: "1px solid black",
    padding: "10px",
    marginTop: "15px",
  },

  boxTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    borderBottom: "1px solid black",
    marginBottom: "8px",
  },

  block: {
    marginBottom: "10px",
  },

  text: {
    fontSize: "12px",
  },

  small: {
    fontSize: "11px",
    color: "#333",
  },
};

export default ClassicTemplate;
