-- CreateTable
CREATE TABLE "Merchant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchant.code_unique" ON "Merchant"("code");
