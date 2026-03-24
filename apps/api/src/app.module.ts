import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { StoresModule } from './stores/stores.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module'; 


@Module({
  imports: [StoresModule, AuthModule, ProductsModule ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
