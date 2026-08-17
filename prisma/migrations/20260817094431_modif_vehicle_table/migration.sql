/*
  Warnings:

  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_idCustomer_fkey";

-- DropTable
DROP TABLE "Vehicle";

-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "immatriculation" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "fuel_type" "Fuel" NOT NULL,
    "transmission" "Transmission" NOT NULL,
    "idCustomer" INTEGER NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_immatriculation_key" ON "vehicles"("immatriculation");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
