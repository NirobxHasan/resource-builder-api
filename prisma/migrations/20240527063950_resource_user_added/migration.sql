/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ResourceUser" (
    "user_id" TEXT NOT NULL,
    "resource_id" TEXT NOT NULL,
    "joining_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResourceUser_pkey" PRIMARY KEY ("user_id","resource_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_code_key" ON "Resource"("code");

-- AddForeignKey
ALTER TABLE "ResourceUser" ADD CONSTRAINT "ResourceUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceUser" ADD CONSTRAINT "ResourceUser_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
