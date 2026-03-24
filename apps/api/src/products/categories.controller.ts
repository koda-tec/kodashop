import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: { name: string; storeId: string }) {
    return this.prisma.category.create({ data: body });
  }

  @Get(':storeId')
  async findAll(@Param('storeId') storeId: string) {
    return this.prisma.category.findMany({ where: { storeId } });
  }
}