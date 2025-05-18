-- AlterTable
ALTER TABLE "SaleData" ADD COLUMN     "fileFormat" TEXT NOT NULL DEFAULT 'PDF',
ADD COLUMN     "hasAnswer" BOOLEAN NOT NULL DEFAULT true;
