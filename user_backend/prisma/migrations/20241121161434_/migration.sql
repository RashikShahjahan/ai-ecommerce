/*
  Warnings:

  - You are about to drop the column `messages` on the `ChatHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatHistory" DROP COLUMN "messages";

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "chatHistoryId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatHistoryId_fkey" FOREIGN KEY ("chatHistoryId") REFERENCES "ChatHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
