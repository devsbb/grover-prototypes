import { Injectable } from '@nestjs/common';
import { VoucherService } from '../voucher/voucher.service';

@Injectable()
export class OffersService {
  protected offers = new Map<string, string>([['R190766418', 'testCode']]);

  constructor(private voucherService: VoucherService) {}
  async check(id: string): Promise<string | null> {
    return this.offers.has(id) ? this.offers.get(id) : null;
  }
  async saveUsed(id: string, offer: string): Promise<void> {
    this.offers.set(id, offer);
  }
  async invalidate(offer: string) {
    // return this.voucherService.disableVoucher(offer);
    const res = await this.voucherService.getVoucher(offer);
    return res;
  }
}
