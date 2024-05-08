-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'sells_manager';

-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "address" TEXT;
