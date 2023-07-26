-- CreateTable
CREATE TABLE "Graduate" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT,
    "github" TEXT,
    "avatar" TEXT,
    "linkedin" TEXT,
    "role" TEXT,
    "cohort" TEXT,
    "CV" TEXT,
    "coverLetter" TEXT,
    "gitFP" TEXT,
    "demoFP" TEXT,

    CONSTRAINT "Graduate_pkey" PRIMARY KEY ("id")
);
