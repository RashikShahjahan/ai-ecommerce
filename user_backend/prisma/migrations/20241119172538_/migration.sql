/*
  Warnings:

  - You are about to drop the column `shippingAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DurationType" AS ENUM ('EPHEMERAL', 'TEMPORAL', 'PERSISTENT', 'ETERNAL');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_cartId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingAddress";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductVariant";

-- DropTable
DROP TABLE "_OrderToProduct";

-- CreateTable
CREATE TABLE "Essence" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "energySignature" TEXT NOT NULL,
    "duration" "DurationType" NOT NULL DEFAULT 'EPHEMERAL',
    "origin" TEXT NOT NULL,
    "sideEffects" TEXT[],
    "cartId" TEXT,

    CONSTRAINT "Essence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manifestation" (
    "id" TEXT NOT NULL,
    "intensity" TEXT NOT NULL,
    "clarity" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "essenceId" TEXT NOT NULL,
    "stock" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Manifestation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EssenceToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EssenceToOrder_AB_unique" ON "_EssenceToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_EssenceToOrder_B_index" ON "_EssenceToOrder"("B");

-- AddForeignKey
ALTER TABLE "Essence" ADD CONSTRAINT "Essence_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manifestation" ADD CONSTRAINT "Manifestation_essenceId_fkey" FOREIGN KEY ("essenceId") REFERENCES "Essence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EssenceToOrder" ADD CONSTRAINT "_EssenceToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Essence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EssenceToOrder" ADD CONSTRAINT "_EssenceToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
