import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      // Limpiamos los datos antes de enviarlos a Prisma
      const price = parseFloat(data.price);
      const comparePrice = data.comparePrice ? parseFloat(data.comparePrice) : null;
      const stock = parseInt(data.stock) || 0;
      
      // IMPORTANTE: Si categoryId es un string vacío, debemos pasarlo como null o undefined
      const categoryId = data.categoryId && data.categoryId.trim() !== "" ? data.categoryId : null;

      return await this.prisma.product.create({
        data: {
          name: data.name,
          description: data.description || null,
          price: isNaN(price) ? 0 : price,
          comparePrice: isNaN(comparePrice as number) ? null : comparePrice,
          sku: data.sku || null,
          stock: stock,
          images: data.images || [],
          videoUrl: data.videoUrl || null,
          storeId: data.storeId,
          // Relación de categoría (solo si existe)
          ...(categoryId && { category: { connect: { id: categoryId } } }),
          // Para las variantes, guardamos la estructura como un registro simple por ahora
          // o puedes omitirlo si prefieres manejar la tabla de variantes por separado luego
        },
      });
    } catch (error) {
      console.error("❌ ERROR PRISMA:", error);
      throw new InternalServerErrorException({
        message: "Error al crear el producto en la base de datos",
        error: error.message
      });
    }
  }

  async findAllByStore(storeId: string) {
    try {
      return await this.prisma.product.findMany({
        where: { storeId },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      return [];
    }
  }
}