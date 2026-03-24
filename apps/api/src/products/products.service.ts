// apps/api/src/products/products.service.ts
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
          sku: data.sku || null,
          stock: parseInt(data.stock) || 0,
          images: data.images || [],
          videoUrl: data.videoUrl || null,
          storeId: data.storeId,
          categoryId: data.categoryId || null,
        },
      });
    } catch (error) {
      console.error("Error creando producto:", error);
      throw new InternalServerErrorException("Error al guardar el producto");
    }
  }

  async findAllByStore(storeId: string) {
    try {
      return await this.prisma.product.findMany({
        where: { storeId },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error("Error obteniendo productos:", error);
      return []; // Si falla, devolvemos un array vacío para que el frontend no rompa
    }
  }
}