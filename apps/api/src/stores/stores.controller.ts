// apps/api/src/stores/stores.controller.ts
import { Controller, Post, Get, Body, UseGuards, Request, Patch, Param } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
@Get(':id')
async findOne(@Param('id') id: string) {
  return this.storesService.findOne(id);
}

@UseGuards(JwtAuthGuard)
@Patch(':id')
async update(@Param('id') id: string, @Body() body: any) {
  return this.storesService.update(id, body);
}

// GET /stores/public/:subdomain
@Get('public/:subdomain')
async getPublicStore(@Param('subdomain') subdomain: string) {
  return this.storesService.findBySubdomain(subdomain);
}
}