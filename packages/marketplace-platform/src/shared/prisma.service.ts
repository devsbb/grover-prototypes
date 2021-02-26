import { PrismaClient } from '@prisma/client';
import { OnModuleDestroy, OnModuleInit, Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit {
  onModuleInit() {
    this.$connect();
  }
  onModuleDestroy() {
    this.$disconnect();
  }
}
