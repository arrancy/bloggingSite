/*
  Warnings:

  - You are about to drop the column `verification_token` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verification_token";

-- CreateTable
CREATE TABLE "verification_token" (
    "id" SERIAL NOT NULL,
    "token" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "verification_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_userId_key" ON "verification_token"("userId");

-- AddForeignKey
ALTER TABLE "verification_token" ADD CONSTRAINT "verification_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
