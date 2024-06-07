/*
  Warnings:

  - Added the required column `current_price` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "current_price" DECIMAL(65,30) NOT NULL;
