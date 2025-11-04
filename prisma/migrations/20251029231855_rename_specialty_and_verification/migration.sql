/*
  Warnings:

  - You are about to drop the column `specialty` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationStatus` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "specialty",
DROP COLUMN "verificationStatus",
ADD COLUMN     "approvalStatus" "ApprovalStatus" DEFAULT 'PENDING',
ADD COLUMN     "specialization" TEXT;

-- DropEnum
DROP TYPE "public"."VerificationStatus";
