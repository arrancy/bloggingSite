/*
  Warnings:

  - You are about to drop the column `deviceId` on the `RefreshToken` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "RefreshToken_deviceId_key";

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "deviceId";
