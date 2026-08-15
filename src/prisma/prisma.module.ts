import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Optionnel : rend PrismaService disponible partout sans importer le module
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}