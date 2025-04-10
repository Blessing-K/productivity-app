/*
  Warnings:

  - You are about to drop the column `completeBy` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "completeBy",
ADD COLUMN     "completedBy" TIMESTAMP(3);
