import { Test, TestingModule } from '@nestjs/testing';
import { WorkshopManagerController } from './workshop_manager.controller';

describe('WorkshopManagerController', () => {
  let controller: WorkshopManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkshopManagerController],
    }).compile();

    controller = module.get<WorkshopManagerController>(WorkshopManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
