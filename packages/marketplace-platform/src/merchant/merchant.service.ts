import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { Merchant } from 'schema/types';

@Injectable()
export class MerchantService {
  constructor(private db: PrismaService) {}

  async getMerchant(code: string): Promise<Merchant> {
    return this.db.merchant.findFirst({
      where: { code },
      include: { features: { select: { config: true, active: true } } },
    });
  }
}
