/*
  Warnings:

  - You are about to drop the column `approvalStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `specialization` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "approvalStatus",
DROP COLUMN "specialization",
ADD COLUMN     "specialty" TEXT,
ADD COLUMN     "verificationStatus" "VerificationStatus" DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "public"."ApprovalStatus";
