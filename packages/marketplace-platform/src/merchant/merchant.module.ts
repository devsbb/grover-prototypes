import { Module } from '@nestjs/common';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { PrismaService } from '../shared/prisma.service';

@Module({
  controllers: [MerchantController],
  providers: [MerchantService, PrismaService],
})
export class MerchantModule {}