/*
  Warnings:

  - You are about to drop the column `freeShipping` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "freeShipping",
ADD COLUMN     "free_shipping" BOOLEAN NOT NULL DEFAULT false;
