/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SaleData" (
    "saleDataId" TEXT NOT NULL PRIMARY KEY,
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
    "someday" TEXT NOT NULL
);
