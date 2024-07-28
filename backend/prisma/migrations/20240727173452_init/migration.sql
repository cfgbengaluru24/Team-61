-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "College" (
    "college_id" TEXT NOT NULL,
    "college_name" TEXT NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("college_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "student_id" TEXT NOT NULL,
    "student_email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "reg_no" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "enrolled" BOOLEAN NOT NULL,
    "is_dropped" BOOLEAN NOT NULL,
    "clg_id" TEXT NOT NULL,
    "mentor_id" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Mentor" (
    "mentor_id" TEXT NOT NULL,
    "mentor_email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "reg_no" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "company_details" TEXT NOT NULL,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("mentor_id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" TEXT NOT NULL,
    "admin_email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "attendance_id" TEXT NOT NULL,
    "ispresent" BOOLEAN NOT NULL,
    "student_id" TEXT NOT NULL,
    "lecture_id" TEXT NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "lecture_id" TEXT NOT NULL,
    "lecture_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("lecture_id")
);

-- CreateTable
CREATE TABLE "Test" (
    "test_id" TEXT NOT NULL,
    "test_date" TIMESTAMP(3) NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("test_id")
);

-- CreateTable
CREATE TABLE "TestScore" (
    "score_id" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "TestScore_pkey" PRIMARY KEY ("score_id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "ques_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "option1" TEXT NOT NULL,
    "option2" TEXT NOT NULL,
    "option3" TEXT NOT NULL,
    "option4" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("ques_id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "feedback_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "attendance_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "LectureFeedback" (
    "feedback_id" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "lecture_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "LectureFeedback_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "College_college_name_key" ON "College"("college_name");

-- CreateIndex
CREATE UNIQUE INDEX "Student_student_email_key" ON "Student"("student_email");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_mentor_email_key" ON "Mentor"("mentor_email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_admin_email_key" ON "Admin"("admin_email");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_question_key" ON "Questions"("question");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_clg_id_fkey" FOREIGN KEY ("clg_id") REFERENCES "College"("college_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "Mentor"("mentor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("lecture_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestScore" ADD CONSTRAINT "TestScore_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_attendance_id_fkey" FOREIGN KEY ("attendance_id") REFERENCES "Attendance"("attendance_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureFeedback" ADD CONSTRAINT "LectureFeedback_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("lecture_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureFeedback" ADD CONSTRAINT "LectureFeedback_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
