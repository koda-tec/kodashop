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
        videos: data.videos || [], 
        status: data.status || "PUBLISHED",
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

  
// Eliminar producto
async remove(id: string) {
  return await this.prisma.product.delete({
    where: { id },
  });
}

// Actualizar producto
async update(id: string, data: any) {
  return await this.prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      comparePrice: data.comparePrice ? parseFloat(data.comparePrice) : null,
      costPrice: data.costPrice ? parseFloat(data.costPrice) : null,
      saleEndsAt: data.saleEndsAt ? new Date(data.saleEndsAt) : null,
      sku: data.sku,
      stock: parseInt(data.stock),
      status: data.status,
      images: data.images,
      videos: data.videos,
      categoryId: data.categoryId && data.categoryId.length > 10 ? data.categoryId : null,
    },
  });
}

}
