/*
  Warnings:

  - The values [MANUEL] on the enum `Transmission` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Transmission_new" AS ENUM ('MANUAL', 'AUTOMATIC');
ALTER TABLE "vehicles" ALTER COLUMN "transmission" TYPE "Transmission_new" USING ("transmission"::text::"Transmission_new");
ALTER TYPE "Transmission" RENAME TO "Transmission_old";
ALTER TYPE "Transmission_new" RENAME TO "Transmission";
DROP TYPE "public"."Transmission_old";
COMMIT;
