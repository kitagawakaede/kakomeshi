/*
  Warnings:

  - The primary key for the `SaleData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Features1` on the `SaleData` table. All the data in the column will be lost.
  - You are about to drop the column `Features2` on the `SaleData` table. All the data in the column will be lost.
  - You are about to drop the column `Features3` on the `SaleData` table. All the data in the column will be lost.
  - You are about to drop the column `className` on the `SaleData` table. All the data in the column will be lost.
  - You are about to drop the column `explanation` on the `SaleData` table. All the data in the column will be lost.
  - You are about to drop the column `saleDataId` on the `SaleData` table. All the data in the column will be lost.
  - You are about to drop the column `someday` on the `SaleData` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SaleData` table. All the data in the column will be lost.
  - Added the required column `description` to the `SaleData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examUrl` to the `SaleData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `graduationYear` to the `SaleData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `SaleData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SaleData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleData" DROP CONSTRAINT "SaleData_pkey",
DROP COLUMN "Features1",
DROP COLUMN "Features2",
DROP COLUMN "Features3",
DROP COLUMN "className",
DROP COLUMN "explanation",
DROP COLUMN "saleDataId",
DROP COLUMN "someday",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "examUrl" TEXT NOT NULL,
ADD COLUMN     "graduationYear" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "SaleData_pkey" PRIMARY KEY ("id");
