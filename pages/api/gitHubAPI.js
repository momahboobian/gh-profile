const dayjs = require("dayjs");
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN,
});

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { owner } = req.query;

  try {
    const today = dayjs().format("YYYY-MM-DD");
    const oneWeekAgo = dayjs().subtract(7, "days").format("YYYY-MM-DD");
    const oneMonthAgo = dayjs().subtract(1, "month").format("YYYY-MM-DD");

    // const apiUrl = `/search/commits?q=author:${owner}+committer-date:${oneWeekAgo}..${today}`;
    // const commits = await octokit.request(apiUrl);

    // const search = await octokit.request(
    //   `GET /search/commits?q=author:${owner}`
    // );

    // Use octokit.search.commits to search for commits within a date range
    const commitsResponse = await octokit.search.commits({
      q: `author:${owner} committer-date:${oneWeekAgo}..${today}`,
      // q: `author:${owner}`,
    });

    const commits = commitsResponse.data.items;
    const totalCommitsLastWeek = commitsResponse.data.total_count; // Total commits from the last week

    // Check if there are commits
    if (commits && commits.length > 0) {
      const ownerLogin = commits[0].author.login;
      console.log("Owner:", ownerLogin);

      const avatar_url = commits[0].author.avatar_url;
      if (avatar_url) {
        // Update the avatar URL for the specific user
        await prisma.graduate.updateMany({
          where: { github: owner },
          data: {
            avatar: { set: avatar_url },
          },
        });
        console.log("Avatar URL updated:", avatar_url);
      }
      // Send the total commits from the last week in the response
      return res.json({ commits, totalCommitsLastWeek });
    } else {
      console.log("No commits found for the owner:", owner);
      return res.json({ totalCommitsLastWeek }); // Send total commits even if there are no commits in the response
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return res
      .status(500)
      .json({ error: "Error fetching data from Github API" });
  }
}
