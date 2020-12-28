import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VoucherService } from './voucher.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  providers: [VoucherService],
  exports: [VoucherService],
})
export class VoucherModule {}
