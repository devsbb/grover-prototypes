import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VoucherService {
  url: string = '';
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.url = this.configService.get<string>('VOUCHERIFY_URL');
    this.httpService.axiosRef.defaults.headers.common = {
      'X-App-Id': this.configService.get<string>('VOUCHERIFY_APP_ID'),
      'X-App-Token': this.configService.get<string>('VOUCHERIFY_APP_TOKEN'),
      'Content-Type': 'application/json',
    };
  }
  async getVoucher(code: string) {
    return this.httpService.get(`${this.url}/v1/vouchers/${code}`).toPromise();
  }
  async disableVoucher(code: string) {
    return this.httpService
      .post(`${this.url}/v1/vouchers/${code}/disable`)
      .toPromise();
  }
  async getCampaignVouchers(campaign: string) {
    return this.httpService
      .get(`${this.url}/v1/vouchers?campaign=${campaign}`)
      .toPromise();
  }
}
