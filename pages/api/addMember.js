import prisma from "lib/prisma.js";

export default async function handler(req, res) {
  try {
    // Use Prisma to create a new member in the database
    const createdMember = await prisma.graduate.create({
      data: req.body,
    });
    res.status(201).json(createdMember); // 201 Created status code for successful creation
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ error: "Failed to add member" }); // 500 Internal Server Error for generic error response
  }
}
