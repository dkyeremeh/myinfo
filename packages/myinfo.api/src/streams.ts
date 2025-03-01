import { db } from './db';
import { consumeMessages, sendMessage } from 'shared/build/streams';

consumeMessages('auth.login', (user) => sendMessage('user.scan', user));

consumeMessages('auth.signup', async (user) => {
  if (!user.id) return;
  console.log('user signup found');
  await db('users').insert(user);

  sendMessage('user.scan', user);
});

consumeMessages('user.scan.result', async (info) => {
  if (!info.user) return;
  console.log('saving user info');

  await db('user_info').insert(info);
});
