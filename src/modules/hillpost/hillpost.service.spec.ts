import { Test, TestingModule } from '@nestjs/testing';
import { HillpostService } from './hillpost.service';

describe('HillpostService', () => {
  let service: HillpostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HillpostService],
    }).compile();

    service = module.get<HillpostService>(HillpostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
