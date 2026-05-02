exports.githubProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const data = await getGitHubData(username);

    res.json({
      name: data.profile.name,
      publicRepos: data.profile.public_repos,
      followers: data.profile.followers,
      topLanguages: data.topLanguages,
      repos: data.repos,
    });
  } catch (error) {
    res.status(500).json({ message: "GitHub fetch failed" });
  }
};

exports.parseLinkedIn = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    // 🔥 delete file after processing
    fs.unlinkSync(filePath);

    const text = pdfData.text;

    res.json({
      message: "LinkedIn profile parsed successfully",
      textPreview: text.substring(0, 2000),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
