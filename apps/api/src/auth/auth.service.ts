import { Injectable, ConflictException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

async register(email: string, pass: string) {
  const existingUser = await this.prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new ConflictException('Este correo ya está registrado');
  
  // Validación de seguridad mínima (puedes añadir más lógica aquí)
  if (pass.length < 8) throw new BadRequestException('La contraseña debe tener al menos 8 caracteres');

  const hashedPassword = await bcrypt.hash(pass, 10);
  return this.prisma.user.create({
    data: { email, password: hashedPassword },
    select: { id: true, email: true, createdAt: true } // No devolver el hash de la contraseña
  });
}

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { id: user.id, email: user.email }
    };
  }
}