const dayjs = require("dayjs");
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN,
});

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req, res) {
  const { owner } = req.body;
  // const owner = "MoMahboobian";
  try {
    const today = dayjs().format("YYYY-MM-DD");
    const oneWeekAgo = dayjs().subtract(7, "days").format("YYYY-MM-DD");

    const commits = await octokit.request(
      `GET /search/commits?q=author:${owner}+committer-date:${oneWeekAgo}..${today}`
    );

    const avatar_url = commits.data.items[0].author.avatar_url;

    await prisma.graduate.updateMany({
      where: { github: owner },
      data: {
        avatar: { set: avatar_url },
      },
    });

    return res.json([commits.data]);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res
      .status(500)
      .json({ error: "Error fetching data from Github API" });
  }
}
