-- CreateEnum
CREATE TYPE "BranchName" AS ENUM ('HRDEPARTMENT', 'PURCHASEDEPARTMENT', 'SELLDEPERTMENT');

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'SUBSCRIBER';

-- CreateTable
CREATE TABLE "subscribers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "contactNumber" TEXT NOT NULL,
    "address" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date_of_birth" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "meritalStatus" "MaritalStatus",
    "profilePhoto" TEXT,
    "contactNumber" TEXT NOT NULL,
    "emergencyContactName" TEXT,
    "address" TEXT,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "qualification" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "joing_date" TEXT,
    "resigning_date" TEXT,
    "bankAccountNumber" TEXT,
    "bankName" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "branchName" "BranchName" NOT NULL,
    "managerId" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_email_key" ON "subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_managerId_key" ON "Branch"("managerId");

-- AddForeignKey
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
