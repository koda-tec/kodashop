import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        comparePrice: data.comparePrice ? parseFloat(data.comparePrice) : null,
        sku: data.sku,
        stock: parseInt(data.stock) || 0,
        images: data.images,
        videoUrl: data.videoUrl,
        storeId: data.storeId,
      },
    });
  }

  async findAllByStore(storeId: string) {
    return this.prisma.product.findMany({
      where: { storeId },
      orderBy: { createdAt: 'desc' },
    });
  }
}