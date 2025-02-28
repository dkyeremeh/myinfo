import { db } from './db';
import { consumeMessages, sendMessage } from 'shared/src/streams';

consumeMessages('auth.signup', (user) => {
  if (!user.id) return;
  console.log('user signup found');

  db('users').insert(user);

  sendMessage('scan_user', user);
});
