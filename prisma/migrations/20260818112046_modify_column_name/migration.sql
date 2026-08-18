/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `mechanics` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `receptionists` table. All the data in the column will be lost.
  - Added the required column `phone` to the `mechanics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `receptionists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mechanics" DROP COLUMN "phoneNumber",
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "receptionists" DROP COLUMN "phoneNumber",
ADD COLUMN     "phone" TEXT NOT NULL;
