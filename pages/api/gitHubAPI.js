const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req, res) {
  //   const { owner, repository } = req.body;
  const owner = "nataliiazab";
  const repository = "good-pr";
  //this is the user we check the data for
  const user = "farnooshmo";
  try {
    const commits = await octokit.request(
      `GET /repos/${owner}/${repository}/commits?author=${user}`
    );
    return res.status(200).json([commits.data]);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res
      .status(500)
      .json({ error: "Error fetching data from Github API" });
  }
}
