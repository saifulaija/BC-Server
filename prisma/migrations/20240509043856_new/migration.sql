/*
  Warnings:

  - Added the required column `designation` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "designation" TEXT NOT NULL;
