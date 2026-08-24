-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_idMechanic_fkey";

-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "idMechanic" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_idMechanic_fkey" FOREIGN KEY ("idMechanic") REFERENCES "mechanics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
