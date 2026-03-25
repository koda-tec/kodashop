import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

 async create(data: any) {
  try {
    const price = parseFloat(data.price) || 0;
    const comparePrice = data.comparePrice ? parseFloat(data.comparePrice) : null;
    const stock = parseInt(data.stock) || 0;
    
    // Si categoryId es un string vacío o demasiado corto, lo hacemos null
    const categoryId = data.categoryId && data.categoryId.length > 10 ? data.categoryId : null;

    return await this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description || "",
        price: price,
        comparePrice: comparePrice,
        sku: data.sku || null,
        stock: stock,
        images: data.images || [],
        videoUrl: data.videoUrl || null,
        storeId: data.storeId,
        categoryId: categoryId, // Pasamos el ID directamente
      },
    });
  } catch (error) {
    console.error("❌ ERROR CRÍTICO EN PRISMA:", error);
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