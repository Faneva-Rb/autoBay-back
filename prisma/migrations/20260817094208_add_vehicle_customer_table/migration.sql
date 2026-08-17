/*
  Warnings:

  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('MANUEL', 'AUTOMATIC');

-- CreateEnum
CREATE TYPE "Fuel" AS ENUM ('ESSENCE', 'DIESEL');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'RECEPTIONIST';
ALTER TYPE "Role" ADD VALUE 'WORKSHOP_MANAGER';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "firstName",
ADD COLUMN     "first_name" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "first_name" TEXT,
    "address" TEXT,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "immatriculation" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "fuel_type" "Fuel" NOT NULL,
    "transmission" "Transmission" NOT NULL,
    "idCustomer" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_immatriculation_key" ON "Vehicle"("immatriculation");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
