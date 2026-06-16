import { Test, TestingModule } from '@nestjs/testing';
import { HillpostController } from './hillpost.controller';
import { HillpostService } from './hillpost.service';

describe('HillpostController', () => {
  let controller: HillpostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HillpostController],
      providers: [HillpostService],
    }).compile();

    controller = module.get<HillpostController>(HillpostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
