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

    // Fetch commits for the last week
    const commitsResponseLastWeek = await octokit.search.commits({
      q: `author:${owner} committer-date:${oneWeekAgo}..${today}`,
    });

    // Fetch commits for the last month
    const commitsResponseLastMonth = await octokit.search.commits({
      q: `author:${owner} committer-date:${oneMonthAgo}..${today}`,
    });

    // const apiUrl = `/search/commits?q=author:${owner}+committer-date:${oneWeekAgo}..${today}`;
    // const commits = await octokit.request(apiUrl);

    // const search = await octokit.request(
    //   `GET /search/commits?q=author:${owner}`
    // );

    // Use octokit.search.commits to search for commits within a date range
    // Fetch commits for the last week

    const commitsLastWeek = commitsResponseLastWeek.data.items;
    const commitsLastMonth = commitsResponseLastMonth.data.items;
    const totalCommitsLastWeek = commitsResponseLastWeek.data.total_count;
    const totalCommitsLastMonth =
      commitsResponseLastMonth.data.total_count || 0;

    // Check if there are commits for the last week
    if (commitsLastWeek && commitsLastWeek.length > 0) {
      const ownerLogin = commitsLastWeek[0].author.login;
      console.log("Owner:", ownerLogin);

      const avatar_url = commitsLastWeek[0].author.avatar_url;
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
    } else {
      console.log("No commits found for the owner in the last week:", owner);
    }

    // Send the total commits from the last week and last month in the response
    return res.json({
      commitsLastWeek,
      commitsLastMonth,
      totalCommitsLastWeek,
      totalCommitsLastMonth,
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return res
      .status(500)
      .json({ error: "Error fetching data from Github API" });
  }
}
