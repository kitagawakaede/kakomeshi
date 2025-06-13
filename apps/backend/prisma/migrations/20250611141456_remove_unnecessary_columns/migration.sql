/*
  Warnings:

  - You are about to drop the column `fileFormat` on the `SaleData` table. All the data in the column will be lost.
  - You are about to drop the column `hasAnswer` on the `SaleData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SaleData" DROP COLUMN "fileFormat",
DROP COLUMN "hasAnswer";
