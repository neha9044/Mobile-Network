-- CreateEnum
CREATE TYPE "ExperienceType" AS ENUM ('JOB', 'INTERNSHIP');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "socialLinks" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "profilePhoto" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT,
    "cvId" INTEGER NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT,
    "cvId" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "type" "ExperienceType" NOT NULL,
    "organization" TEXT NOT NULL,
    "technology" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT,
    "cvId" INTEGER NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" SERIAL NOT NULL,
    "board" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "passingYear" INTEGER NOT NULL,
    "degree" TEXT,
    "score" TEXT NOT NULL,
    "cvId" INTEGER NOT NULL,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "links" TEXT[],
    "cvId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternetCv" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "profession" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "profileSummary" TEXT NOT NULL,
    "skills" TEXT[],
    "languages" TEXT[],
    "hobbies" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternetCv_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNo_key" ON "User"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "InternetCv_userId_key" ON "InternetCv"("userId");

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "InternetCv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "InternetCv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "InternetCv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "InternetCv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "InternetCv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
