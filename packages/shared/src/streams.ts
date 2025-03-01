import amqplib from 'amqplib';
import { delay } from './utils';

let connection: amqplib.Connection;
let channel: amqplib.Channel;

const rabbitUser = process.env.RABBITMQ_DEFAULT_USER;
const rabbitPass = process.env.RABBITMQ_DEFAULT_PASS;
const rabbitHost = process.env.RABBITMQ_HOST;

const con = async () => {
  connection = await amqplib.connect(
    `amqp://${rabbitUser}:${rabbitPass}@${rabbitHost}`
  );
  channel = await connection.createChannel();
};

const connect = async () => {
  if (connection) return;
  while (!connection) {
    await con().catch(() =>
      console.log('cannot connect to rabbitmq, will try again')
    );
    await delay(5e3);
  }
};

export const sendMessage = async (
  queue: string,
  message: Record<string, any>
) => {
  try {
    if (!connection) await connect();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    console.log('📤 Message queued:', queue, message);
  } catch (err) {
    console.error('Error queuing message:', err);
  }
};

export const consumeMessages = async (
  queue: string,
  fn: (msg: Record<string, any>) => void
) => {
  try {
    if (!connection) await connect();
    await channel.assertQueue(queue);

    console.log(`📥 Waiting for messages in ${queue}`);

    channel.consume(queue, (msg) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        channel.ack(msg); // Acknowledge message

        console.log('✅ Received:', queue, message);
        fn(message);
      }
    });
  } catch (err) {
    console.error('Error:', err);
  }
};
