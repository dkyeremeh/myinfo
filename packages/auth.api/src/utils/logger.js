import dayjs from 'dayjs';
const createLogFn = (method) => (...args) => {
    const time = dayjs().format('YYYY-M-D HH:mm:ss.SSS');
    const meta = [time, `- [${method.toUpperCase()}]`];
    console[method](...meta, ...args);
};
const logger = {
    debug: createLogFn('debug'),
    info: createLogFn('info'),
    warn: createLogFn('warn'),
    error: createLogFn('error'),
};
export default logger;
