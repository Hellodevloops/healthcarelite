/*
  Warnings:

  - You are about to alter the column `consultationFees` on the `Patient` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - You are about to alter the column `otherFees` on the `Patient` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "address" TEXT,
    "visitDate" DATETIME,
    "consultationFees" INTEGER,
    "otherFees" INTEGER,
    "notes" TEXT,
    "prescription" TEXT,
    "paymentMode" TEXT,
    "status" TEXT NOT NULL DEFAULT 'New',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Patient" ("address", "age", "consultationFees", "createdAt", "gender", "id", "name", "notes", "number", "otherFees", "paymentMode", "prescription", "visitDate") SELECT "address", "age", "consultationFees", "createdAt", "gender", "id", "name", "notes", "number", "otherFees", "paymentMode", "prescription", "visitDate" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
