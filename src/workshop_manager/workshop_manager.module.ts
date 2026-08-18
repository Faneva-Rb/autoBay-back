import { Module } from '@nestjs/common';
import { WorkshopManagerService } from './workshop_manager.service';
import { WorkshopManagerController } from './workshop_manager.controller';

@Module({
  providers: [WorkshopManagerService],
  controllers: [WorkshopManagerController]
})
export class WorkshopManagerModule {}
