/*
  Warnings:

  - Added the required column `userId` to the `SaleData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleData" ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "SaleData" ADD CONSTRAINT "SaleData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 既存のデータにはデフォルト値を割り当てた後、デフォルト制約を削除
ALTER TABLE "SaleData" ALTER COLUMN "userId" DROP DEFAULT;
