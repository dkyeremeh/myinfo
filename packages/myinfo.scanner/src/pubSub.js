import Redis from 'ioredis';
const redisConfig = { host: process.env.REDIS_HOST, port: 6379 };
const channels = new Set();
const listeners = {};
const redisPub = new Redis(redisConfig);
const redisSub = new Redis(redisConfig);
redisSub.on('message', (channel, message) => {
    var _a;
    (_a = listeners[channel]) === null || _a === void 0 ? void 0 : _a.forEach((fn) => fn(message));
});
export const publish = redisPub.publish.bind(redisPub);
export const onMessage = (channel, fn) => {
    var _a;
    if (!channels.has(channel)) {
        redisSub.subscribe(channel);
        channels.add(channel);
    }
    (_a = listeners[channel]) !== null && _a !== void 0 ? _a : (listeners[channel] = []);
    listeners[channel].push(fn);
};
