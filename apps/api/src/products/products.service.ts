import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
  try {
    console.log("📥 DATOS RECIBIDOS:", data);

    const price = parseFloat(data.price) || 0;
    const comparePrice = data.comparePrice ? parseFloat(data.comparePrice) : null;
    const stock = parseInt(data.stock) || 0;
    
    // Validamos que el categoryId sea un ID real (UUID), si es un string vacío lo hacemos null
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
        categoryId: categoryId, // <--- CAMBIO CLAVE: Pasamos el ID directamente como un string
      },
    });
  } catch (error) {
    console.error("❌ ERROR CRÍTICO EN PRISMA:", error);
    throw new InternalServerErrorException({
      message: "Error en el servidor al crear producto",
      detail: error.message
    });
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