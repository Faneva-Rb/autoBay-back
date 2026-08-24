-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('ROUTINE_MAINTENANCE', 'PERIODIC_SERVICE', 'MECHANICAL_REPAIR', 'DIAGNOSTIC', 'BODYWORK', 'TECHNICAL_INSPECTION', 'TIRE_FITTING', 'OTHER');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'REMINDER_SENT', 'CLIENT_PRESENT', 'OR_CREATED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "reference" TEXT NOT NULL,
    "type" "AppointmentType" NOT NULL,
    "date" DATE NOT NULL,
    "time" TEXT NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "reminder_sent_at" TIMESTAMP(3),
    "idCustomer" INTEGER NOT NULL,
    "idVehicle" INTEGER NOT NULL,
    "idMechanic" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "appointments_reference_key" ON "appointments"("reference");

-- CreateIndex
CREATE INDEX "appointments_date_idx" ON "appointments"("date");

-- CreateIndex
CREATE INDEX "appointments_status_idx" ON "appointments"("status");

-- CreateIndex
CREATE INDEX "appointments_idCustomer_idx" ON "appointments"("idCustomer");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_idVehicle_fkey" FOREIGN KEY ("idVehicle") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_idMechanic_fkey" FOREIGN KEY ("idMechanic") REFERENCES "mechanics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
