import { Test, TestingModule } from '@nestjs/testing';
import { SamtlController } from './samtl.controller';
import { SamtlService } from './samtl.service';

describe('SamtlController', () => {
  let controller: SamtlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SamtlController],
      providers: [SamtlService],
    }).compile();

    controller = module.get<SamtlController>(SamtlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
