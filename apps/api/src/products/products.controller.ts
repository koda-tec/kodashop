import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: any) {
    return this.productsService.create({
      name: body.name,
      price: Number(body.price),
      description: body.description,
      images: body.images,
      storeId: body.storeId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':storeId')
  async findAll(@Param('storeId') storeId: string) {
    return this.productsService.findAllByStore(storeId);
  }
}