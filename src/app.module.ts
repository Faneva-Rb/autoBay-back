import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MechanicsModule } from './mechanics/mechanics.module';
import { WorkshopManagerModule } from './workshop_manager/workshop_manager.module';
import { ReceptionistsModule } from './receptionists/receptionists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    MechanicsModule,
    WorkshopManagerModule,
    ReceptionistsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
