import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { KafkaConfig } from 'kafkajs';
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  get settings(): KafkaConfig {
    return {
      clientId: 'bundle-offers',
      brokers: [this.configService.get<string>('KAFKA_BROKERS')],
      ssl: true,
      sasl: {
        username: this.configService.get<string>('KAFKA_SASL_USERNAME'),
        password: this.configService.get<string>('KAFKA_SASL_PASSWORD'),
        mechanism: this.configService.get<'scram-sha-256'>(
          'KAFKA_SASL_MECHANISM',
        ),
      },
    };
  }
}
