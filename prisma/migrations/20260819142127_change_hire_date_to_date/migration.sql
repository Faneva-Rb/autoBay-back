/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `mechanics` table. All the data in the column will be lost.
  - Added the required column `phone` to the `mechanics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mechanics" DROP COLUMN "phoneNumber",
ADD COLUMN     "phone" TEXT NOT NULL,
ALTER COLUMN "hire_date" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "receptionists" (
    "id" SERIAL NOT NULL,
    "salary" TEXT NOT NULL,
    "hire_date" DATE NOT NULL,
    "phone" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "receptionists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "receptionists_idUser_key" ON "receptionists"("idUser");

-- AddForeignKey
ALTER TABLE "receptionists" ADD CONSTRAINT "receptionists_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
