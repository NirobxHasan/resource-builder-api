/*
  Warnings:

  - The `content` column on the `modules` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "modules" DROP COLUMN "content",
ADD COLUMN     "content" JSONB;
