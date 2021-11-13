import { User } from './models/User';

const user = new User();

user.events.on('change', () => {
  console.log('change!');
});

user.events.trigger('change');