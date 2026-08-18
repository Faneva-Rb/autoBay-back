-- CreateTable
CREATE TABLE "mechanics" (
    "id" SERIAL NOT NULL,
    "speciality" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT false,
    "phoneNumber" TEXT NOT NULL,
    "hire_date" TIMESTAMP(3) NOT NULL,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "mechanics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mechanics_idUser_key" ON "mechanics"("idUser");

-- AddForeignKey
ALTER TABLE "mechanics" ADD CONSTRAINT "mechanics_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
