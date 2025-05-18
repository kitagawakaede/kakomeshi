-- CreateTable
CREATE TABLE "SaleData" (
    "saleDataId" INTEGER NOT NULL,
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

    CONSTRAINT "SaleData_pkey" PRIMARY KEY ("saleDataId")
);
