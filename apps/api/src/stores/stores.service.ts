// apps/api/src/stores/stores.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  // Añadimos userId a la definición de los datos
  async createStore(data: { name: string; subdomain: string; ownerEmail: string; userId: string }) {
    return this.prisma.store.create({
      data: {
        name: data.name,
        subdomain: data.subdomain,
        ownerEmail: data.ownerEmail,
        userId: data.userId, // <--- Esto es lo que faltaba
      },
    });
  }

  // Cambiamos findAll por findAllByUser para que no traiga todo
  async findAllByUser(userId: string) {
    return this.prisma.store.findMany({
      where: { userId },
    });
  }
}