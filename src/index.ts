// import { UserForm } from './views/UserForm';
import { UserForm } from './views/test';
import { UserForm2 } from './views/test2';
import { User } from './models/User';

const user = User.buildUser({ name: 'NAME', age: 20 });

const root = document.getElementById('root');

if (root) {
  const userForm = new UserForm(root, user);

  userForm.render();
} else {
  throw new Error('Root element not found');
}

const user2 = User.buildUser({ name: 'Admin'});

const test = document.getElementById('test');

if (test) {
  const userForm = new UserForm2(test, user2);

  userForm.render();
} else {
  throw new Error('Root element not found');
}