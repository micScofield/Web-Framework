import { User } from './models/User';

const user = new User({ name: 'new record', age: 0 });

user.events.on('change', () => {
  console.log('change!');
});

user.events.trigger('change');

// user.sync.save({ name: "SJ", age: 23 });
setTimeout(() => {
  user.sync.fetch(1);
}, 1000)
setTimeout(() => {
  console.log(user.sync.data);
}, 2000);