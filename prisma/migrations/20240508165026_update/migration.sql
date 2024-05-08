/*
  Warnings:

  - You are about to drop the column `date_of_birth` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the `appointments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctorSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctor_specialties` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medicalReports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patientHelthDatas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prescriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specialties` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `subscribers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `subscribers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_email_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_patientId_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "doctorSchedule" DROP CONSTRAINT "doctorSchedule_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "doctorSchedule" DROP CONSTRAINT "doctorSchedule_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "doctorSchedule" DROP CONSTRAINT "doctorSchedule_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "doctor_specialties" DROP CONSTRAINT "doctor_specialties_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "doctor_specialties" DROP CONSTRAINT "doctor_specialties_specialtiesId_fkey";

-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_email_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_email_fkey";

-- DropForeignKey
ALTER TABLE "medicalReports" DROP CONSTRAINT "medicalReports_patientId_fkey";

-- DropForeignKey
ALTER TABLE "patientHelthDatas" DROP CONSTRAINT "patientHelthDatas_patientId_fkey";

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_email_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "prescriptions" DROP CONSTRAINT "prescriptions_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "prescriptions" DROP CONSTRAINT "prescriptions_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "prescriptions" DROP CONSTRAINT "prescriptions_patientId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_patientId_fkey";

-- DropForeignKey
ALTER TABLE "subscribers" DROP CONSTRAINT "subscribers_email_fkey";

-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "date_of_birth",
ADD COLUMN     "dob" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subscribers" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "appointments";

-- DropTable
DROP TABLE "doctorSchedule";

-- DropTable
DROP TABLE "doctor_specialties";

-- DropTable
DROP TABLE "doctors";

-- DropTable
DROP TABLE "medicalReports";

-- DropTable
DROP TABLE "patientHelthDatas";

-- DropTable
DROP TABLE "patients";

-- DropTable
DROP TABLE "payments";

-- DropTable
DROP TABLE "prescriptions";

-- DropTable
DROP TABLE "reviews";

-- DropTable
DROP TABLE "schedule";

-- DropTable
DROP TABLE "specialties";

-- DropEnum
DROP TYPE "AppointmentStatus";

-- DropEnum
DROP TYPE "BloodGroup";

-- DropEnum
DROP TYPE "PaymentStatus";

-- CreateIndex
CREATE UNIQUE INDEX "admins_userId_key" ON "admins"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "employees_userId_key" ON "employees"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_userId_key" ON "subscribers"("userId");

-- AddForeignKey
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
