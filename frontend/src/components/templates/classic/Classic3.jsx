const Classic3 = ({ form }) => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>CURRICULUM VITAE</h1>

      {/* PERSONAL DETAILS */}
      <Section title="Personal Details">
        <table style={styles.table}>
          <tbody>
            <Row label="Name" value={form.name} />
            <Row label="Email" value={form.email} />
            <Row label="Phone" value={form.phone} />
            <Row label="Address" value={form.address} />
            <Row label="LinkedIn" value={form.linkedin} />
            <Row label="GitHub" value={form.github} />
            <Row label="Portfolio" value={form.portfolio} />
            <Row label="Applying Position" value={form.title} />
          </tbody>
        </table>
      </Section>

      {/* SUMMARY */}
      <Section title="Profile Summary">
        <p style={styles.text}>
          {form.summary ||
            "A motivated individual seeking an opportunity to apply skills and grow professionally."}
        </p>
      </Section>

      {/* SKILLS */}
      <Section title="Skills">
        <ul style={styles.list}>
          {form.skills?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </Section>

      {/* EXPERIENCE */}
      <Section title="Work Experience">
        {form.experience?.map((e, i) => (
          <table key={i} style={styles.table}>
            <tbody>
              <Row label="Role" value={e.role} />
              <Row label="Company" value={e.company} />
              <Row label="Duration" value={e.duration} />
              <Row label="Description" value={e.description} />
            </tbody>
          </table>
        ))}
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        {form.projects?.map((p, i) => (
          <table key={i} style={styles.table}>
            <tbody>
              <Row label="Project Name" value={p.name} />
              <Row label="Description" value={p.description} />
            </tbody>
          </table>
        ))}
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        {form.education?.map((ed, i) => (
          <table key={i} style={styles.table}>
            <tbody>
              <Row label="Degree" value={ed.degree} />
              <Row label="Institute" value={ed.institute} />
              <Row label="Year" value={ed.year} />
            </tbody>
          </table>
        ))}
      </Section>
    </div>
  );
};

/* =========================
   ROW COMPONENT
========================= */
const Row = ({ label, value }) => (
  <tr>
    <td style={styles.label}>{label}</td>
    <td style={styles.value}>{value || "-"}</td>
  </tr>
);

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
   STYLES (TABLE CV)
========================= */
const styles = {
  page: {
    maxWidth: "850px",
    margin: "auto",
    padding: "30px",
    fontFamily: "Times New Roman",
    background: "#fff",
    color: "#000",
  },

  title: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
  },

  section: {
    marginBottom: "15px",
  },

  sectionTitle: {
    fontSize: "16px",
    borderBottom: "1px solid #000",
    marginBottom: "8px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "10px",
  },

  label: {
    width: "30%",
    fontWeight: "bold",
    border: "1px solid #000",
    padding: "6px",
    background: "#f5f5f5",
  },

  value: {
    border: "1px solid #000",
    padding: "6px",
  },

  text: {
    fontSize: "14px",
  },

  list: {
    paddingLeft: "20px",
    fontSize: "14px",
  },
};

export default Classic3;
