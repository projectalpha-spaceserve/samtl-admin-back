import { Controller } from '@nestjs/common';
import { SamtlService } from './samtl.service';

@Controller('samtl')
export class SamtlController {
  constructor(private readonly samtlService: SamtlService) {}
}
