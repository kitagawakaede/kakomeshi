/*
  Warnings:

  - The primary key for the `SaleData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `saleDataId` on the `SaleData` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SaleData" (
    "saleDataId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "universityName" TEXT NOT NULL,
    "facultyName" TEXT NOT NULL,
    "departmentName" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "Features1" TEXT NOT NULL,
    "Features2" TEXT NOT NULL,
    "Features3" TEXT NOT NULL,
    "someday" TEXT NOT NULL,
    "filePath" TEXT
);
INSERT INTO "new_SaleData" ("Features1", "Features2", "Features3", "className", "departmentName", "explanation", "facultyName", "price", "saleDataId", "someday", "universityName", "userId") SELECT "Features1", "Features2", "Features3", "className", "departmentName", "explanation", "facultyName", "price", "saleDataId", "someday", "universityName", "userId" FROM "SaleData";
DROP TABLE "SaleData";
ALTER TABLE "new_SaleData" RENAME TO "SaleData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
