import { db } from './db';
import { consumeMessages, sendMessage } from 'shared/build/streams';

consumeMessages('auth.signup', (user) => {
  if (!user.id) return;
  console.log('user signup found');

  db('users').insert(user);

  sendMessage('scan_user', user);
});

consumeMessages('auth.login', (user) => {
  console.log('user logged in', user);
});
