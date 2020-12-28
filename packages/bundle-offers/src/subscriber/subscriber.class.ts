import { Consumer } from '@nestjs/microservices/external/kafka.interface';

export abstract class Subscriber {
  consumer: Consumer;
  get subscriptions() {
    const target = Object.getPrototypeOf(this);
    return Reflect.getOwnMetadata('subscriptions', target) || [];
  }

  async subscribe() {
    const topics = Object.keys(this.subscriptions);
    topics.map(
      async (topic) =>
        await this.consumer.subscribe({ topic, fromBeginning: false }),
    );
    this.consumer.run({
      eachMessage: async function ({ message, topic }) {
        return this.subscriptions[topic]
          ? this.subscriptions[topic].bind(this)(message)
          : null;
      }.bind(this),
    });
  }
}
