-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_mentor_id_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "mentor_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "Mentor"("mentor_id") ON DELETE SET NULL ON UPDATE CASCADE;
