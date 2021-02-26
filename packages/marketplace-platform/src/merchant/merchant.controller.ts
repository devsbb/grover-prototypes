import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { Merchant } from '../../schema/types';
import { MerchantService } from './merchant.service';

@Controller('merchant')
export class MerchantController {
  constructor(private service: MerchantService) {}
  @Get(':code')
  async getMerchant(@Param() { code }): Promise<Merchant> {
    const res = await this.service.getMerchant(code);
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }
}
