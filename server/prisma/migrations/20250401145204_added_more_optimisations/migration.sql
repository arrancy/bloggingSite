/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `verification_token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expiresAt` to the `verification_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "verification_token" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "verification_token"("token");
