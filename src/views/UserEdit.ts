import { User, UserProps } from "../models/User";
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";
import { View } from "./View";

export class UserEdit extends View<User, UserProps> {
    regionsMap(): { [key: string]: string } {
        return {
            userShow: ".user-show",
            userForm: ".user-form",
        };
    }

    onRender(): void {
        console.log('Inside onRender of UserEdit');
        // create instances of both regions and call render
        const userShow = new UserShow(this.regions.userShow, this.model);
        console.log('Inside onRender of UserEdit, calling userShow');
        userShow.render();

        const userForm = new UserForm(this.regions.userForm, this.model);
        console.log('Inside onRender of UserEdit, calling userForm');
        userForm.render();
    }

    template(): string {
        return `
      <div>
        <div class="user-show"></div>
        <div class="user-form"></div>
      </div>
    `;
    }
}
