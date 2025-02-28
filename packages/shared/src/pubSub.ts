import Redis from 'ioredis';

const redisConfig = { host: process.env.REDIS_HOST, port: 6379 };

const channels: Set<string> = new Set();
const listeners: Record<string, Function[]> = {};

const redisPub = new Redis(redisConfig);
const redisSub = new Redis(redisConfig);

redisSub.on('message', (channel, message) => {
  listeners[channel]?.forEach((fn) => fn(message));
});
export const publish = redisPub.publish.bind(redisPub);

export const onMessage = (channel: string, fn: (message: string) => void) => {
  if (!channels.has(channel)) {
    redisSub.subscribe(channel);
    channels.add(channel);
  }
  listeners[channel] ??= [];
  listeners[channel].push(fn);
};
