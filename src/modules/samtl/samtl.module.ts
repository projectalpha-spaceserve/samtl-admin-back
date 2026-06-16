import { Module } from '@nestjs/common';
import { SamtlService } from './samtl.service';
import { SamtlController } from './samtl.controller';

@Module({
  controllers: [SamtlController],
  providers: [SamtlService],
})
export class SamtlModule {}
