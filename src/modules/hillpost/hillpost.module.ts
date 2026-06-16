import { Module } from '@nestjs/common';
import { HillpostService } from './hillpost.service';
import { HillpostController } from './hillpost.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, HttpModule, AuthModule],
  controllers: [HillpostController],
  providers: [HillpostService],
})
export class HillpostModule { }