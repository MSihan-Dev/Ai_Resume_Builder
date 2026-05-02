import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// ATS Templates
import ATS1 from "../components/templates/ats/ATS1";
import ATS2 from "../components/templates/ats/ATS2";
import ATS3 from "../components/templates/ats/ATS3";
import ATS4 from "../components/templates/ats/ATS4";
import ATS5 from "../components/templates/ats/ATS5";

// Creative Templates
import Creative1 from "../components/templates/creative/Creative1";
import Creative2 from "../components/templates/creative/Creative2";
import Creative3 from "../components/templates/creative/Creative3";
import Creative4 from "../components/templates/creative/Creative4";
import Creative5 from "../components/templates/creative/Creative5";

// Minimal Templates
import Minimal1 from "../components/templates/minimal/Minimal1";
import Minimal2 from "../components/templates/minimal/Minimal2";
import Minimal3 from "../components/templates/minimal/Minimal3";
import Minimal4 from "../components/templates/minimal/Minimal4";
import Minimal5 from "../components/templates/minimal/Minimal5";

// Classic Templates
import Classic1 from "../components/templates/classic/Classic1";
import Classic2 from "../components/templates/classic/Classic2";
import Classic3 from "../components/templates/classic/Classic3";
import Classic4 from "../components/templates/classic/Classic4";
import Classic5 from "../components/templates/classic/Classic5";

// Modern Templates
import Modern1 from "../components/templates/modern/Modern1";
import Modern2 from "../components/templates/modern/Modern2";
import Modern3 from "../components/templates/modern/Modern3";
import Modern4 from "../components/templates/modern/Modern4";
import Modern5 from "../components/templates/modern/Modern5";

const ResumeBuilder = () => {
  const resumeRef = useRef();
  const [template, setTemplate] = useState("Modern1");
  const [showSuccess, setShowSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
    title: "",
    summary: "",
    skills: [],
    experience: [],
    projects: [],
    education: [],
    certifications: [],
    languages: [],
  });

  // Template categories with their variants
  const templateCategories = {
    Modern: {
      name: "Modern",
      icon: "🎨",
      description: "Clean & contemporary designs",
      templates: [
        {
          id: "Modern1",
          name: "Executive",
          icon: "💼",
          desc: "Perfect for senior roles",
        },
        {
          id: "Modern2",
          name: "Sidebar",
          icon: "📑",
          desc: "Highlighted sidebar layout",
        },
        {
          id: "Modern3",
          name: "Developer",
          icon: "💻",
          desc: "Tech-focused design",
        },
        { id: "Modern4", name: "Creative", icon: "🎨", desc: "Unique layout" },
        {
          id: "Modern5",
          name: "Professional",
          icon: "⭐",
          desc: "Standard professional",
        },
      ],
    },
    Minimal: {
      name: "Minimal",
      icon: "✨",
      description: "Simple & elegant designs",
      templates: [
        {
          id: "Minimal1",
          name: "Clean",
          icon: "🧼",
          desc: "Ultra-clean layout",
        },
        {
          id: "Minimal2",
          name: "Elegant",
          icon: "🌸",
          desc: "Sophisticated style",
        },
        { id: "Minimal3", name: "Simple", icon: "📄", desc: "Straightforward" },
        {
          id: "Minimal4",
          name: "Compact",
          icon: "📐",
          desc: "Space-efficient",
        },
        { id: "Minimal5", name: "Airy", icon: "💨", desc: "Breathing space" },
      ],
    },
    Classic: {
      name: "Classic",
      icon: "📜",
      description: "Traditional & professional",
      templates: [
        {
          id: "Classic1",
          name: "Formal",
          icon: "🏛️",
          desc: "Traditional format",
        },
        {
          id: "Classic2",
          name: "Elegant",
          icon: "✨",
          desc: "Timeless design",
        },
        {
          id: "Classic3",
          name: "Standard",
          icon: "📋",
          desc: "Industry standard",
        },
        { id: "Classic4", name: "Refined", icon: "🎯", desc: "Polished look" },
        {
          id: "Classic5",
          name: "Executive",
          icon: "👔",
          desc: "Leadership focus",
        },
      ],
    },
    Creative: {
      name: "Creative",
      icon: "🌟",
      description: "Unique & bold designs",
      templates: [
        {
          id: "Creative1",
          name: "Designer",
          icon: "🎨",
          desc: "For creative roles",
        },
        { id: "Creative2", name: "Bold", icon: "⚡", desc: "Make a statement" },
        {
          id: "Creative3",
          name: "Modern Art",
          icon: "🖼️",
          desc: "Artistic layout",
        },
        {
          id: "Creative4",
          name: "Portfolio",
          icon: "📸",
          desc: "Showcase work",
        },
        {
          id: "Creative5",
          name: "Innovative",
          icon: "💡",
          desc: "Unique approach",
        },
      ],
    },
    ATS: {
      name: "ATS Pro",
      icon: "🤖",
      description: "Applicant tracking optimized",
      templates: [
        { id: "ATS1", name: "Optimized", icon: "⚙️", desc: "ATS-friendly" },
        { id: "ATS2", name: "Standard", icon: "📊", desc: "Balanced layout" },
        { id: "ATS3", name: "Keywords", icon: "🔑", desc: "Keyword focused" },
        { id: "ATS4", name: "Simple", icon: "📄", desc: "Parsing optimized" },
        {
          id: "ATS5",
          name: "Professional",
          icon: "💼",
          desc: "Corporate ready",
        },
      ],
    },
  };

  const [inputSkill, setInputSkill] = useState("");
  const [inputLanguage, setInputLanguage] = useState("");
  const [activeSection, setActiveSection] = useState("personal");
  const [selectedCategory, setSelectedCategory] = useState("Modern");

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("resume_builder_data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setForm(parsed);
      } catch (e) {
        console.error("Failed to load saved data");
      }
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("resume_builder_data", JSON.stringify(form));
    }, 500);
    return () => clearTimeout(timeout);
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Skills
  const addSkill = () => {
    if (!inputSkill.trim()) return;
    setForm({ ...form, skills: [...form.skills, inputSkill.trim()] });
    setInputSkill("");
  };

  const removeSkill = (i) => {
    setForm({
      ...form,
      skills: form.skills.filter((_, index) => index !== i),
    });
  };

  // Languages
  const addLanguage = () => {
    if (!inputLanguage.trim()) return;
    setForm({ ...form, languages: [...form.languages, inputLanguage.trim()] });
    setInputLanguage("");
  };

  const removeLanguage = (i) => {
    setForm({
      ...form,
      languages: form.languages.filter((_, index) => index !== i),
    });
  };

  // Experience
  const addExperience = () => {
    setForm({
      ...form,
      experience: [
        ...form.experience,
        { role: "", company: "", duration: "", description: "" },
      ],
    });
  };

  const updateExperience = (i, key, value) => {
    const updated = [...form.experience];
    updated[i][key] = value;
    setForm({ ...form, experience: updated });
  };

  const removeExperience = (i) => {
    setForm({
      ...form,
      experience: form.experience.filter((_, index) => index !== i),
    });
  };

  // Projects
  const addProject = () => {
    setForm({
      ...form,
      projects: [...form.projects, { name: "", description: "", link: "" }],
    });
  };

  const updateProject = (i, key, value) => {
    const updated = [...form.projects];
    updated[i][key] = value;
    setForm({ ...form, projects: updated });
  };

  const removeProject = (i) => {
    setForm({
      ...form,
      projects: form.projects.filter((_, index) => index !== i),
    });
  };

  // Education
  const addEducation = () => {
    setForm({
      ...form,
      education: [
        ...form.education,
        { degree: "", institute: "", year: "", description: "" },
      ],
    });
  };

  const updateEducation = (i, key, value) => {
    const updated = [...form.education];
    updated[i][key] = value;
    setForm({ ...form, education: updated });
  };

  const removeEducation = (i) => {
    setForm({
      ...form,
      education: form.education.filter((_, index) => index !== i),
    });
  };

  // Certifications
  const addCertification = () => {
    setForm({
      ...form,
      certifications: [
        ...form.certifications,
        { name: "", issuer: "", date: "" },
      ],
    });
  };

  const updateCertification = (i, key, value) => {
    const updated = [...form.certifications];
    updated[i][key] = value;
    setForm({ ...form, certifications: updated });
  };

  const removeCertification = (i) => {
    setForm({
      ...form,
      certifications: form.certifications.filter((_, index) => index !== i),
    });
  };

  const downloadPDF = async () => {
    setSaving(true);
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = 210;
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${form.name || "resume"}.pdf`);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const renderTemplate = () => {
    const props = { form };

    const templateComponents = {
      // Modern Templates
      Modern1,
      Modern2,
      Modern3,
      Modern4,
      Modern5,
      // Minimal Templates
      Minimal1,
      Minimal2,
      Minimal3,
      Minimal4,
      Minimal5,
      // Classic Templates
      Classic1,
      Classic2,
      Classic3,
      Classic4,
      Classic5,
      // Creative Templates
      Creative1,
      Creative2,
      Creative3,
      Creative4,
      Creative5,
      // ATS Templates
      ATS1,
      ATS2,
      ATS3,
      ATS4,
      ATS5,
    };

    const SelectedTemplate = templateComponents[template];
    return SelectedTemplate ? (
      <SelectedTemplate {...props} />
    ) : (
      <Modern1 {...props} />
    );
  };

  const clearForm = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all data? This cannot be undone.",
      )
    ) {
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        github: "",
        portfolio: "",
        title: "",
        summary: "",
        skills: [],
        experience: [],
        projects: [],
        education: [],
        certifications: [],
        languages: [],
      });
      localStorage.removeItem("resume_builder_data");
    }
  };

  const navItems = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "summary", label: "Summary", icon: "📝" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "certifications", label: "Certifications", icon: "🏆" },
    { id: "languages", label: "Languages", icon: "🌐" },
    { id: "templates", label: "Templates", icon: "🎨" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            <span style={styles.titleIcon}>✨</span> AI Resume Builder
          </h1>
          <p style={styles.subtitle}>
            Create a professional resume with 25+ stunning templates
          </p>
        </div>
        <button onClick={clearForm} style={styles.clearBtn}>
          🗑️ Clear All
        </button>
      </div>

      {showSuccess && (
        <div style={styles.successToast}>
          ✅ Resume downloaded successfully!
        </div>
      )}

      <div style={styles.grid}>
        {/* Left Form */}
        <div style={styles.formCard}>
          <div style={styles.navTabs}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{
                  ...styles.navButton,
                  ...(activeSection === item.id ? styles.navButtonActive : {}),
                }}
              >
                <span style={styles.navIcon}>{item.icon}</span>
                <span style={styles.navLabel}>{item.label}</span>
              </button>
            ))}
          </div>

          <div style={styles.formContent}>
            {/* Personal Info */}
            {activeSection === "personal" && (
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Personal Information</h3>
                <div style={styles.inputGroup}>
                  <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <input
                    name="title"
                    placeholder="Professional Title"
                    value={form.title}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <input
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <input
                    name="address"
                    placeholder="Location"
                    value={form.address}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <input
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    value={form.linkedin}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <input
                    name="github"
                    placeholder="GitHub URL"
                    value={form.github}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <input
                    name="portfolio"
                    placeholder="Portfolio URL"
                    value={form.portfolio}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              </div>
            )}

            {/* Summary */}
            {activeSection === "summary" && (
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Professional Summary</h3>
                <textarea
                  name="summary"
                  placeholder="Write a compelling professional summary..."
                  value={form.summary}
                  onChange={handleChange}
                  style={{ ...styles.textarea, minHeight: "150px" }}
                  rows="6"
                />
                <p style={styles.hint}>
                  💡 Tip: Highlight your key achievements and career goals
                </p>
              </div>
            )}

            {/* Skills */}
            {activeSection === "skills" && (
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Technical Skills</h3>
                <div style={styles.inputGroup}>
                  <div style={styles.row}>
                    <input
                      value={inputSkill}
                      onChange={(e) => setInputSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                      placeholder="Type a skill and press Enter"
                      style={{ ...styles.input, flex: 1 }}
                    />
                    <button onClick={addSkill} style={styles.addBtn}>
                      + Add
                    </button>
                  </div>
                  <div style={styles.tagWrap}>
                    {form.skills.map((s, i) => (
                      <span key={i} style={styles.tag}>
                        {s}
                        <button
                          onClick={() => removeSkill(i)}
                          style={styles.tagRemoveBtn}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {form.skills.length === 0 && (
                      <p style={styles.emptyText}>No skills added yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Experience */}
            {activeSection === "experience" && (
              <div style={styles.section}>
                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>Work Experience</h3>
                  <button onClick={addExperience} style={styles.addSectionBtn}>
                    + Add Experience
                  </button>
                </div>
                {form.experience.map((exp, i) => (
                  <div key={i} style={styles.box}>
                    <div style={styles.boxHeader}>
                      <span style={styles.boxTitle}>Experience #{i + 1}</span>
                      <button
                        onClick={() => removeExperience(i)}
                        style={styles.removeBtn}
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      placeholder="Job Title"
                      value={exp.role}
                      onChange={(e) =>
                        updateExperience(i, "role", e.target.value)
                      }
                      style={styles.input}
                    />
                    <input
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(i, "company", e.target.value)
                      }
                      style={styles.input}
                    />
                    <input
                      placeholder="Duration"
                      value={exp.duration}
                      onChange={(e) =>
                        updateExperience(i, "duration", e.target.value)
                      }
                      style={styles.input}
                    />
                    <textarea
                      placeholder="Job Description"
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(i, "description", e.target.value)
                      }
                      style={styles.textarea}
                      rows="3"
                    />
                  </div>
                ))}
                {form.experience.length === 0 && (
                  <p style={styles.emptyText}>No experience added</p>
                )}
              </div>
            )}

            {/* Projects */}
            {activeSection === "projects" && (
              <div style={styles.section}>
                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>Projects</h3>
                  <button onClick={addProject} style={styles.addSectionBtn}>
                    + Add Project
                  </button>
                </div>
                {form.projects.map((proj, i) => (
                  <div key={i} style={styles.box}>
                    <div style={styles.boxHeader}>
                      <span style={styles.boxTitle}>Project #{i + 1}</span>
                      <button
                        onClick={() => removeProject(i)}
                        style={styles.removeBtn}
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      placeholder="Project Name"
                      value={proj.name}
                      onChange={(e) => updateProject(i, "name", e.target.value)}
                      style={styles.input}
                    />
                    <textarea
                      placeholder="Project Description"
                      value={proj.description}
                      onChange={(e) =>
                        updateProject(i, "description", e.target.value)
                      }
                      style={styles.textarea}
                      rows="3"
                    />
                    <input
                      placeholder="Project Link"
                      value={proj.link}
                      onChange={(e) => updateProject(i, "link", e.target.value)}
                      style={styles.input}
                    />
                  </div>
                ))}
                {form.projects.length === 0 && (
                  <p style={styles.emptyText}>No projects added</p>
                )}
              </div>
            )}

            {/* Education */}
            {activeSection === "education" && (
              <div style={styles.section}>
                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>Education</h3>
                  <button onClick={addEducation} style={styles.addSectionBtn}>
                    + Add Education
                  </button>
                </div>
                {form.education.map((edu, i) => (
                  <div key={i} style={styles.box}>
                    <div style={styles.boxHeader}>
                      <span style={styles.boxTitle}>Education #{i + 1}</span>
                      <button
                        onClick={() => removeEducation(i)}
                        style={styles.removeBtn}
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(i, "degree", e.target.value)
                      }
                      style={styles.input}
                    />
                    <input
                      placeholder="Institution"
                      value={edu.institute}
                      onChange={(e) =>
                        updateEducation(i, "institute", e.target.value)
                      }
                      style={styles.input}
                    />
                    <input
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) =>
                        updateEducation(i, "year", e.target.value)
                      }
                      style={styles.input}
                    />
                    <textarea
                      placeholder="Additional Info"
                      value={edu.description}
                      onChange={(e) =>
                        updateEducation(i, "description", e.target.value)
                      }
                      style={styles.textarea}
                      rows="2"
                    />
                  </div>
                ))}
                {form.education.length === 0 && (
                  <p style={styles.emptyText}>No education added</p>
                )}
              </div>
            )}

            {/* Certifications */}
            {activeSection === "certifications" && (
              <div style={styles.section}>
                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>Certifications</h3>
                  <button
                    onClick={addCertification}
                    style={styles.addSectionBtn}
                  >
                    + Add Certification
                  </button>
                </div>
                {form.certifications.map((cert, i) => (
                  <div key={i} style={styles.box}>
                    <div style={styles.boxHeader}>
                      <span style={styles.boxTitle}>
                        Certification #{i + 1}
                      </span>
                      <button
                        onClick={() => removeCertification(i)}
                        style={styles.removeBtn}
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      placeholder="Certification Name"
                      value={cert.name}
                      onChange={(e) =>
                        updateCertification(i, "name", e.target.value)
                      }
                      style={styles.input}
                    />
                    <input
                      placeholder="Issuer"
                      value={cert.issuer}
                      onChange={(e) =>
                        updateCertification(i, "issuer", e.target.value)
                      }
                      style={styles.input}
                    />
                    <input
                      placeholder="Date"
                      value={cert.date}
                      onChange={(e) =>
                        updateCertification(i, "date", e.target.value)
                      }
                      style={styles.input}
                    />
                  </div>
                ))}
                {form.certifications.length === 0 && (
                  <p style={styles.emptyText}>No certifications added</p>
                )}
              </div>
            )}

            {/* Languages */}
            {activeSection === "languages" && (
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Languages</h3>
                <div style={styles.inputGroup}>
                  <div style={styles.row}>
                    <input
                      value={inputLanguage}
                      onChange={(e) => setInputLanguage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addLanguage()}
                      placeholder="Type a language and press Enter"
                      style={{ ...styles.input, flex: 1 }}
                    />
                    <button onClick={addLanguage} style={styles.addBtn}>
                      + Add
                    </button>
                  </div>
                  <div style={styles.tagWrap}>
                    {form.languages.map((lang, i) => (
                      <span key={i} style={styles.tag}>
                        {lang}
                        <button
                          onClick={() => removeLanguage(i)}
                          style={styles.tagRemoveBtn}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {form.languages.length === 0 && (
                      <p style={styles.emptyText}>No languages added</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Templates */}
            {activeSection === "templates" && (
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Choose a Template</h3>

                {/* Category Tabs */}
                <div style={styles.categoryTabs}>
                  {Object.keys(templateCategories).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        ...styles.categoryTab,
                        ...(selectedCategory === cat
                          ? styles.categoryTabActive
                          : {}),
                      }}
                    >
                      <span>{templateCategories[cat].icon}</span>
                      <span>{templateCategories[cat].name}</span>
                    </button>
                  ))}
                </div>

                {/* Category Description */}
                <div style={styles.categoryDesc}>
                  <p>{templateCategories[selectedCategory].description}</p>
                </div>

                {/* Template Grid */}
                <div style={styles.templateGrid}>
                  {templateCategories[selectedCategory].templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t.id)}
                      style={{
                        ...styles.templateCard,
                        ...(template === t.id ? styles.templateCardActive : {}),
                      }}
                    >
                      <div style={styles.templateIcon}>{t.icon}</div>
                      <div style={styles.templateName}>{t.name}</div>
                      <div style={styles.templateDesc}>{t.desc}</div>
                      {template === t.id && (
                        <div style={styles.activeBadge}>✓ Active</div>
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={downloadPDF}
                  style={styles.downloadBtn}
                  disabled={saving}
                >
                  {saving
                    ? "⏳ Generating PDF..."
                    : "📄 Download Resume as PDF"}
                </button>
                <p style={styles.hint}>
                  💡 Tip: Choose ATS Pro templates for better compatibility with
                  job application systems
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Preview */}
        <div style={styles.preview}>
          <div style={styles.previewHeader}>
            <span style={styles.previewIcon}>👁️</span>
            <span style={styles.previewTitle}>Live Preview</span>
            <span style={styles.previewBadge}>
              {templateCategories[selectedCategory]?.name || "Modern"} •{" "}
              {template}
            </span>
          </div>
          <div style={styles.previewContent} ref={resumeRef}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "16px",
  },
  title: {
    fontSize: "32px",
    marginBottom: "8px",
    color: "white",
    fontWeight: "bold",
  },
  titleIcon: {
    marginRight: "10px",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "14px",
  },
  clearBtn: {
    background: "rgba(255, 255, 255, 0.2)",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  successToast: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#10b981",
    color: "white",
    padding: "12px 20px",
    borderRadius: "10px",
    zIndex: 1000,
    animation: "slideIn 0.3s ease",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  formCard: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    maxHeight: "calc(100vh - 140px)",
  },
  navTabs: {
    display: "flex",
    gap: "4px",
    padding: "16px 16px 0 16px",
    background: "#f8fafc",
    borderBottom: "2px solid #e2e8f0",
    flexWrap: "wrap",
  },
  navButton: {
    padding: "10px 16px",
    background: "transparent",
    border: "none",
    borderRadius: "10px 10px 0 0",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    color: "#64748b",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  navButtonActive: {
    background: "white",
    color: "#667eea",
    borderBottom: "3px solid #667eea",
  },
  navIcon: {
    fontSize: "16px",
  },
  navLabel: {
    display: "inline",
  },
  formContent: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
  },
  section: {
    animation: "fadeIn 0.3s ease",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    borderLeft: "4px solid #667eea",
    paddingLeft: "12px",
    margin: "0 0 20px 0",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "14px",
    transition: "all 0.2s",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "14px",
    fontFamily: "inherit",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
  },
  row: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  tagWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "8px",
  },
  tag: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  },
  tagRemoveBtn: {
    background: "rgba(255, 255, 255, 0.3)",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    padding: "0",
  },
  box: {
    border: "1px solid #e2e8f0",
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "12px",
    background: "#fafbfc",
  },
  boxHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    paddingBottom: "8px",
    borderBottom: "1px solid #e2e8f0",
  },
  boxTitle: {
    fontWeight: "600",
    color: "#667eea",
    fontSize: "13px",
  },
  addBtn: {
    background: "#10b981",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  addSectionBtn: {
    background: "#667eea",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  removeBtn: {
    background: "#ef4444",
    color: "white",
    padding: "4px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "11px",
  },
  categoryTabs: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  categoryTab: {
    padding: "8px 16px",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    color: "#64748b",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  categoryTabActive: {
    background: "#667eea",
    borderColor: "#667eea",
    color: "white",
  },
  categoryDesc: {
    background: "#f8fafc",
    padding: "12px 16px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "13px",
    color: "#64748b",
  },
  templateGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: "12px",
    marginBottom: "24px",
  },
  templateCard: {
    position: "relative",
    padding: "16px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    background: "white",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s",
  },
  templateCardActive: {
    borderColor: "#667eea",
    background: "#f3f4ff",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)",
  },
  templateIcon: {
    fontSize: "32px",
    marginBottom: "8px",
  },
  templateName: {
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "4px",
    fontSize: "13px",
  },
  templateDesc: {
    fontSize: "10px",
    color: "#64748b",
  },
  activeBadge: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "#10b981",
    color: "white",
    padding: "2px 6px",
    borderRadius: "10px",
    fontSize: "9px",
    fontWeight: "500",
  },
  downloadBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  preview: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    maxHeight: "calc(100vh - 140px)",
  },
  previewHeader: {
    padding: "16px 20px",
    background: "#f8fafc",
    borderBottom: "2px solid #e2e8f0",
    fontWeight: "600",
    color: "#1e293b",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  previewIcon: {
    fontSize: "16px",
  },
  previewTitle: {
    flex: 1,
  },
  previewBadge: {
    background: "#667eea",
    color: "white",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "10px",
    fontWeight: "500",
  },
  previewContent: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
  },
  emptyText: {
    color: "#94a3b8",
    textAlign: "center",
    padding: "20px",
    fontSize: "13px",
  },
  hint: {
    fontSize: "11px",
    color: "#94a3b8",
    marginTop: "8px",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  input:focus, textarea:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  button:active:not(:disabled) {
    transform: translateY(0);
  }
  
  /* Responsive */
  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .navLabel {
      display: none;
    }
    
    .navButton {
      padding: 8px 12px;
    }
    
    .categoryTabs {
      gap: 6px;
    }
    
    .categoryTab {
      padding: 6px 12px;
      font-size: 11px;
    }
  }
  
  @media (max-width: 480px) {
    .templateGrid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
document.head.appendChild(styleSheet);

export default ResumeBuilder;
