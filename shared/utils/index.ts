import { Channel, ConsumeMessage, connect } from "amqplib";

import config from "../config";

type SubscribeCallback = (message: unknown) => void;

/**
 * Creates a new exchange channel
 * @returns {Promise<Channel>} promise representing a new channel
 */
export const createChannel = async (): Promise<Channel> => {
  const connection = await connect(config.message.broker.url);
  const channel = await connection.createChannel();

  await channel.assertExchange(config.exchange.name, config.exchange.type);

  return channel;
};

/**
 * Publishes a message to an exchange
 * @param channel a channel that will publish
 * @param bindingKey a key to differentiate bindings
 * @param message the content
 * @returns {Promise<boolean>} promise representing if the message was published
 */
export const publishMessage = async (
  channel: Channel,
  bindingKey: string,
  message: string
): Promise<boolean> =>
  channel.publish(config.exchange.name, bindingKey, Buffer.from(message));

/**
 * Subscribes to queue events
 * @param channel a channel that will publish
 * @param queueName the queue name
 * @param bindingKey a key to differentiate bindings
 * @param callback callback resolving with the content
 */
export const subscribeToMessage = async (
  channel: Channel,
  queueName: string,
  bindingKey: string,
  callback: SubscribeCallback
) => {
  const appQueue = await channel.assertQueue(queueName);

  await channel.bindQueue(appQueue.queue, config.exchange.name, bindingKey);

  await channel.consume(appQueue.queue, (data: ConsumeMessage | null) => {
    if (!data) {
      callback(null);

      return;
    }

    callback(JSON.parse(data.content.toString()));
    channel.ack(data);
  });
};
