import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  // Función para crear la tienda en la DB
  async createStore(data: { name: string; subdomain: string; ownerEmail: string }) {
    return this.prisma.store.create({
      data,
    });
  }

  // Función para listar todas las tiendas
  async findAll() {
    return this.prisma.store.findMany();
  }
}