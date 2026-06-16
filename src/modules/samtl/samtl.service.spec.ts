import { Test, TestingModule } from '@nestjs/testing';
import { SamtlService } from './samtl.service';

describe('SamtlService', () => {
  let service: SamtlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SamtlService],
    }).compile();

    service = module.get<SamtlService>(SamtlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
