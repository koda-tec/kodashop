import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriesController } from './categories.controller';
import { VariantTypesController } from './variants.controller';

@Module({
  controllers: [ProductsController, CategoriesController, VariantTypesController], 
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}