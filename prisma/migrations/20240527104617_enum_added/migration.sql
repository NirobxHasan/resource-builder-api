-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDDING', 'ACCEPTED', 'REJECTED', 'CANCELED');

-- AlterTable
ALTER TABLE "ResourceUser" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDDING';
