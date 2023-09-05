import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Optionally, add a condition based on environment variable to recreate the Prisma instance on each request.
if (process.env.RESET_PRISMA_ON_EACH_REQUEST === "true") {
  prisma = new PrismaClient();
}

export default prisma;
