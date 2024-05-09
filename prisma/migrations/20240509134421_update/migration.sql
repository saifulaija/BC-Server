/*
  Warnings:

  - You are about to drop the column `emergencyContactName` on the `employees` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employees" DROP COLUMN "emergencyContactName",
ADD COLUMN     "emergencyContactNumber" TEXT;
