/*
  Warnings:

  - The `messages` column on the `ChatHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ChatHistory" DROP COLUMN "messages",
ADD COLUMN     "messages" TEXT[] DEFAULT ARRAY[]::TEXT[];
