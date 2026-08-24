-- CreateTable
CREATE TABLE "appointment_counters" (
    "year" INTEGER NOT NULL,
    "lastNumber" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "appointment_counters_pkey" PRIMARY KEY ("year")
);
