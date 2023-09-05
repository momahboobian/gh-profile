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

    let totalCommitsLastWeek = 0;
    let totalCommitsLastMonth = 0;

    // // Check rate limit before making the API requests
    // const rateLimit = await octokit.rateLimit.get();
    // const rateLimitRemaining = rateLimit.data.resources.core.remaining;

    // if (rateLimitRemaining <= 0) {
    //   // Handle rate limiting gracefully, you can choose to wait or return an error
    //   return res.status(429).json({ error: "Rate limit exceeded" });
    // }
    // console.log("rateLimitRemaining", rateLimitRemaining);

    // Function to fetch commits for the last week
    const fetchCommitsLastWeek = async () => {
      const commitsResponseLastWeek = await octokit.search.commits({
        q: `author:${owner} committer-date:${oneWeekAgo}..${today}`,
      });

      const commitsLastWeek = commitsResponseLastWeek.data.items;
      totalCommitsLastWeek = commitsResponseLastWeek.data.total_count;

      return commitsLastWeek;
    };

    // Function to fetch commits for the last month
    const fetchCommitsLastMonth = async () => {
      const commitsResponseLastMonth = await octokit.search.commits({
        q: `author:${owner} committer-date:${oneMonthAgo}..${today}`,
      });

      const commitsLastMonth = commitsResponseLastMonth.data.items;
      totalCommitsLastMonth = commitsResponseLastMonth.data.total_count;

      return commitsLastMonth;
    };

    // const apiUrl = `/search/commits?q=author:${owner}+committer-date:${oneWeekAgo}..${today}`;
    // const commits = await octokit.request(apiUrl);

    // const search = await octokit.request(
    //   `GET /search/commits?q=author:${owner}`
    // );

    // Use octokit.search.commits to search for commits within a date range
    // Fetch commits for the last week
    // Check rate limit before making the API requests
    const rateLimit = await octokit.rateLimit.get();
    const rateLimitRemaining = rateLimit.data.resources.core.remaining;

    if (rateLimitRemaining <= 0) {
      // Handle rate limiting gracefully, you can choose to wait or return an error
      return res.status(429).json({ error: "Rate limit exceeded" });
    }
    console.log("rateLimitRemaining", rateLimitRemaining);

    // Fetch commits for the last week
    const commitsLastWeek = await fetchCommitsLastWeek();

    // Fetch commits for the last month
    const commitsLastMonth = await fetchCommitsLastMonth();

    // Update the avatar URL if commits exist for the last week
    if (commitsLastWeek.length > 0) {
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
    if (error.status === 403 && error.headers) {
      // Handle rate limit exceeded by retrying the request after a delay
      const resetTime = new Date(error.headers["x-ratelimit-reset"] * 1000);
      const currentTime = new Date();
      const timeUntilReset = resetTime - currentTime;

      if (timeUntilReset > 0) {
        // Wait for the rate limit to reset before retrying
        await new Promise((resolve) => setTimeout(resolve, timeUntilReset));

        // Retry the request after waiting
        return handler(req, res);
      }
    }

    console.error("Error fetching data:", error.message);
    return res
      .status(500)
      .json({ error: "Error fetching data from Github API" });
  }
}
