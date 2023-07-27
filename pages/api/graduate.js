import prisma from "lib/prisma.js";

export default async function handler(req, res) {
  try {
    const grad = await prisma.graduate.findMany();
    res.status(200).json(grad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
