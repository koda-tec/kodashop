-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "comparePrice" DOUBLE PRECISION,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "videoUrl" TEXT;
