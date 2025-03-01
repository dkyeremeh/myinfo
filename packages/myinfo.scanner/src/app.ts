import { faker } from '@faker-js/faker';
import { consumeMessages, sendMessage } from 'shared/build/streams';

consumeMessages('user.scan', (user) => {
  let count = 0;
  console.log('scanning for user', user);

  const runner = setInterval(() => {
    sendMessage('user.scan.result', {
      site: faker.internet.url(), // Generates a fake website URL
      data: faker.lorem.sentences(5), // Generates a fake sentence
      user: user.id,
    });

    if (count++ >= 5) clearInterval(runner);
  }, 5000);
});
