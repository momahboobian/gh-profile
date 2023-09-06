-- CreateTable
CREATE TABLE "Graduate" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT,
    "github" TEXT,
    "avatar" TEXT,
    "linkedin" TEXT,
    "role" TEXT,
    "cohort" TEXT,

    CONSTRAINT "Graduate_pkey" PRIMARY KEY ("id")
);
