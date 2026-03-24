// apps/api/src/stores/stores.controller.ts
import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { StoresService } from './stores.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any, @Request() req: any) {
    return this.storesService.createStore({
      name: body.name,
      subdomain: body.subdomain,
      ownerEmail: body.ownerEmail,
      userId: req.user.sub, // 'sub' es donde guardamos el ID en el JWT
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.storesService.findAllByUser(req.user.sub);
  }
}