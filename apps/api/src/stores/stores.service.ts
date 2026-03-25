// apps/api/src/stores/stores.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  // 1. Crear tienda vinculada al usuario
  async createStore(data: { name: string; subdomain: string; ownerEmail: string; userId: string }) {
    return this.prisma.store.create({
      data: {
        name: data.name,
        subdomain: data.subdomain,
        ownerEmail: data.ownerEmail,
        userId: data.userId,
      },
    });
  }

  // 2. Listar solo las tiendas del usuario logueado
  async findAllByUser(userId: string) {
    return this.prisma.store.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  // 3. Obtener los datos de una sola tienda (para cargar el panel de diseño/productos)
  async findOne(id: string) {
    return await this.prisma.store.findUnique({
      where: { id },
    });
  }

  // 4. Actualizar toda la configuración de la tienda (Branding + Marketing)
  async update(id: string, data: any) {
    return await this.prisma.store.update({
      where: { id },
      data: {
        name: data.name,
        logo: data.logo,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        templateId: data.templateId,
        // --- Campos de Marketing y Conversión ---
        announcement: data.announcement,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        whatsapp: data.whatsapp,
        banners: data.banners, // Prisma maneja el array de strings automáticamente
      },
    });
  }
  async findBySubdomain(subdomain: string) {
  return await this.prisma.store.findUnique({
    where: { subdomain },
    include: {
      categories: true,
      products: {
        where: { status: 'PUBLISHED' }, // Solo lo que no es borrador
        orderBy: { createdAt: 'desc' }
      }
    }
  });
}
}