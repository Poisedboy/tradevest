/*
  Warnings:

  - You are about to drop the column `total` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `closedAt` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `market` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `profitLoss` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Position` table. All the data in the column will be lost.
  - Added the required column `balanceId` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profit` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_userId_fkey";

-- DropIndex
DROP INDEX "Balance_userId_key";

-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "total",
ADD COLUMN     "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
ADD COLUMN     "market" "Market" NOT NULL DEFAULT 'FOREX';

-- AlterTable
ALTER TABLE "Position" DROP COLUMN "closedAt",
DROP COLUMN "market",
DROP COLUMN "profitLoss",
DROP COLUMN "userId",
ADD COLUMN     "balanceId" TEXT NOT NULL,
ADD COLUMN     "entryTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "exitTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profit" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "entryPrice" SET DATA TYPE TEXT,
ALTER COLUMN "exitPrice" SET DATA TYPE TEXT,
ALTER COLUMN "volume" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
