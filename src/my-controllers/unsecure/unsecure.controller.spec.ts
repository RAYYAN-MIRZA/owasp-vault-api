import { Test, TestingModule } from '@nestjs/testing';
import { UnsecureController } from './unsecure.controller';

describe('UnsecureController', () => {
  let controller: UnsecureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnsecureController],
    }).compile();

    controller = module.get<UnsecureController>(UnsecureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
