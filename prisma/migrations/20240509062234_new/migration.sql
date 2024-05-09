/*
  Warnings:

  - You are about to drop the column `meritalStatus` on the `employees` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employees" DROP COLUMN "meritalStatus",
ADD COLUMN     "maritalStatus" "MaritalStatus";
