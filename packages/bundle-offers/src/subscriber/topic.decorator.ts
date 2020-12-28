import 'reflect-metadata';

/**
 * Associates the given topic with a handler.
 */
export function Topic(topic?: string): MethodDecorator {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const subscriptions = Reflect.getOwnMetadata('subscriptions', target) || {};
    const oldHandler = descriptor.value;
    descriptor.value = function () {
      return oldHandler.apply(this, arguments);
    };
    if (!subscriptions[topic]) {
      subscriptions[topic] = descriptor.value;
    }
    Reflect.defineMetadata('subscriptions', subscriptions, target);
    return descriptor;
  };
}
