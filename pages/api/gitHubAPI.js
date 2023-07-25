const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req, res) {
  //   const { owner } = req.body;
  const owner = "lorenacapraru";
  try {
    const commits = await octokit.request(`GET /users/${owner}/events`);
    return res.json({ commits: commits.data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res
      .status(500)
      .json({ error: "Error fetching data from Github API" });
  }
}
