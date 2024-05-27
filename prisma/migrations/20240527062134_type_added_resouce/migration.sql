/*
  Warnings:

  - The `type` column on the `Resource` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('BOOK', 'COURSE', 'STUDY_MATERIAL', 'COURSE_MODULE');

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'COURSE_MODULE';
