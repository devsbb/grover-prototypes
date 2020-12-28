import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { VoucherModule } from '../voucher/voucher.module';

@Module({
  imports: [VoucherModule],
  exports: [OffersService],
  providers: [OffersService],
})
export class OffersModule {}
