// apps/api/src/products/products.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

// Fragmento a actualizar en products.service.ts
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
      storeId: data.storeId,
      categoryId: data.categoryId || null,
      // Guardamos la configuración de variantes/atributos como JSON por ahora 
      // para facilitar la validación rápida
      variants: {
        create: data.variants?.map((v: any) => ({
          combination: v, // Ej: { "Color": "Rojo", "Talle": "XL" }
          stock: parseInt(data.stock) || 0,
        }))
      }
    },
  });
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