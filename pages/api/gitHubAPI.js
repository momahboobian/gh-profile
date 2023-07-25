const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN,
});

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req, res) {
  //   const { owner } = req.body;
  const owner = "lorenacapraru";
  try {
    const commits = await octokit.request(`GET /users/${owner}/events`);

    const avatar_url = commits.data[0].actor.avatar_url;
    const user = commits.data[0].actor.login;
    console.log(user);

    await prisma.graduate.updateMany({
      where: { github: owner },
      data: {
        avatar: { set: avatar_url },
      },
    });

    return res.json(commits.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res
      .status(500)
      .json({ error: "Error fetching data from Github API" });
  }
}
