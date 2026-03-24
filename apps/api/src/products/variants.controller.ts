import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('variant-types')
export class VariantTypesController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: { name: string; values: string[]; storeId: string }) {
    return this.prisma.variantType.create({ data: body });
  }

  @Get(':storeId')
  async findAll(@Param('storeId') storeId: string) {
    return this.prisma.variantType.findMany({ where: { storeId } });
  }
}