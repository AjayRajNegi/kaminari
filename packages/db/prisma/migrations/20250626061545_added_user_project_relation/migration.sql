/*
  Warnings:

  - You are about to drop the column `description` on the `Prompt` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "description",
ADD COLUMN     "content" TEXT NOT NULL;
