import amqplib from 'amqplib';

let connection: amqplib.Connection;
let channel: amqplib.Channel;

const connect = async () => {
  if (connection) return;
  connection = await amqplib.connect('amqp://user:password@rabbitmq');
  channel = await connection.createChannel();
};

export const sendMessage = async (
  queue: string,
  message: Record<string, any>
) => {
  try {
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    console.log(`📤 Message queued`, message);

    await channel.close();
    await connection.close();
  } catch (err) {
    console.error('Error queuing message:', err);
  }
};

export const consumeMessages = async (
  queue: string,
  fn: (msg: Record<string, any>) => void
) => {
  try {
    await channel.assertQueue(queue);

    console.log(`📥 Waiting for messages in ${queue}`);

    channel.consume(queue, (msg) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        channel.ack(msg); // Acknowledge message

        console.log('✅ Received:', message);
        fn(msg.content);
      }
    });
  } catch (err) {
    console.error('Error:', err);
  }
};

connect();
