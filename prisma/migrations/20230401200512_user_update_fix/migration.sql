-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verification_token" TEXT NOT NULL DEFAULT 'token shitted',
ADD COLUMN     "verified" TIMESTAMP(3);
