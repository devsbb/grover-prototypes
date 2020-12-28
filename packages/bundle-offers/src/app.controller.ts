import 'reflect-metadata';
import {
  Controller,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import {
  Kafka,
  KafkaMessage,
} from '@nestjs/microservices/external/kafka.interface';
import { Topic } from './subscriber/topic.decorator';
import { Subscriber } from './subscriber/subscriber.class';
import { OffersService } from './offers/offers.service';

@Controller()
export class AppController
  extends Subscriber
  implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafka: Kafka,
    private offers: OffersService,
  ) {
    super();
    this.consumer = this.kafka.consumer({ groupId: 'bundle-group' });
  }

  async onModuleInit() {
    try {
      await this.subscribe();
      await this.consumer.connect();
    } catch (e) {
      console.error(e);
    }
  }
  async onModuleDestroy() {
    await this.consumer.disconnect();
    await this.consumer.stop();
  }

  @Topic('subscriptions')
  async handleSubscriptions(message: KafkaMessage): Promise<void> {
    const value = JSON.parse(message.value.toString());

    const eventName = value['event_name'];
    const CANCELED_SUBSCRIPTION_STATUSES = ['CANCELLED', 'cancelled'];
    if (eventName === 'sf-subscription-status-changed') {
      const status = value.payload?.salesforceStatus;

      if (CANCELED_SUBSCRIPTION_STATUSES.includes(status)) {
        const orderNumber = value.payload?.orderNumber;
        const offer = await this.offers.check(orderNumber);
        if (offer) {
          const res = await this.offers.invalidate(offer);
        }
      }
    }
  }

  @Topic('internal.sf.order_placed')
  async handleOrderPlaced(message: KafkaMessage): Promise<void> {
    const value = JSON.parse(message.value.toString());
    const orderNumber = value.payload?.orderNumber ?? '';
    const code = value.payload?.payload?.adjustment?.code ?? null;

    if (!code) return;
    try {
      await this.offers.saveUsed(orderNumber, code);
    } catch (e) {
      console.error(e);
    }
  }
}
