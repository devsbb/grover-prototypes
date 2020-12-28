import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Kafka } from 'kafkajs';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [ConfigModule.forRoot(), OffersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'KAFKA_SERVICE',
      useFactory: (appService: AppService) => {
        const options = appService.settings;
        return new Kafka(options);
      },
      inject: [AppService],
    },
  ],
})
export class AppModule {}
