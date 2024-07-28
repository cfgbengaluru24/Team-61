/*
  Warnings:

  - You are about to drop the column `reg_no` on the `Mentor` table. All the data in the column will be lost.
  - Added the required column `rating` to the `LectureFeedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LectureFeedback" ADD COLUMN     "rating" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Mentor" DROP COLUMN "reg_no";
