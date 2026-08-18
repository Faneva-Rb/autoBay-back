import { Test, TestingModule } from '@nestjs/testing';
import { WorkshopManagerService } from './workshop_manager.service';

describe('WorkshopManagerService', () => {
  let service: WorkshopManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkshopManagerService],
    }).compile();

    service = module.get<WorkshopManagerService>(WorkshopManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
