import { User } from '../models/User';
import { Form } from './Form';

export class UserForm2 extends Form<User> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-name': this.onSetNameClick
    };
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');

    if (input) {
      const name = input.value;

      this.model.set({ name });
    }
  };

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <input />
        <button class="set-name">Change Name</button>
      </div>
    `;
  }

  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
