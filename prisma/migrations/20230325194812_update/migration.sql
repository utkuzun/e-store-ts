/*
  Warnings:

  - You are about to drop the column `averageRating` on the `products` table. All the data in the column will be lost.
  - The `category` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `company` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('office', 'kitchen', 'bedroom');

-- CreateEnum
CREATE TYPE "Company" AS ENUM ('ikea', 'liddy', 'marcos');

-- AlterTable
ALTER TABLE "products" DROP COLUMN "averageRating",
ADD COLUMN     "average_rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "price" SET DEFAULT 0,
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'kitchen',
DROP COLUMN "company",
ADD COLUMN     "company" "Company" NOT NULL DEFAULT 'ikea',
ALTER COLUMN "inventory" SET DEFAULT 15;
