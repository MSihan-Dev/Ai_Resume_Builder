const axios = require("axios");

const GITHUB_API = "https://api.github.com/users";

exports.getGitHubData = async (username) => {
  try {
    const [userRes, repoRes] = await Promise.all([
      axios.get(`${GITHUB_API}/${username}`),
      axios.get(`${GITHUB_API}/${username}/repos`),
    ]);

    const repos = repoRes.data;

    const languages = repos.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      profile: userRes.data,
      repos: repos.slice(0, 10),
      topLanguages: languages,
    };
  } catch (err) {
    throw new Error("GitHub fetch failed");
  }
};
