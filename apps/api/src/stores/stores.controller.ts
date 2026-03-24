import { Controller, Post, Get, Body } from '@nestjs/common';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(@Body() body: { name: string; subdomain: string; ownerEmail: string }) {
    return this.storesService.createStore(body);
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }
}