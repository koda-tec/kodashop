import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

 async create(data: any) {
  try {
    return await this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        comparePrice: data.comparePrice ? parseFloat(data.comparePrice) : null,
        saleEndsAt: data.saleEndsAt ? new Date(data.saleEndsAt) : null, 
        costPrice: data.costPrice ? parseFloat(data.costPrice) : null,
        sku: data.sku || null,
        stock: parseInt(data.stock) || 0,
        images: data.images || [],
        storeId: data.storeId,
        categoryId: data.categoryId || null,
      },
    });
  } catch (error) {
    throw new InternalServerErrorException(error.message);
  }
}

  async findAllByStore(storeId: string) {
    try {
      return await this.prisma.product.findMany({
        where: { storeId },
        // IMPORTANTE: Si te da error aquí, borra la línea de orderBy
        orderBy: { createdAt: 'desc' }, 
      });
    } catch (error) {
      console.error("❌ ERROR AL BUSCAR PRODUCTOS:", error);
      return [];
    }
  }
}