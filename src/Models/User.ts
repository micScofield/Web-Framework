import { Model } from "./Model";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Collection } from './Collection'

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps> {
    static buildUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Eventing(),
            new ApiSync<UserProps>(rootUrl)
        );
    }

    // static method which gets us a collection of users
    static buildUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(
            rootUrl,
            (json: UserProps) => User.buildUser(json)
        );
    }

    isAdminUser(): boolean {
        // we can have some real implementation here
        return false;
    }
}

// Implementation before we introduced a generic Model class -
/*
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { AxiosResponse } from "axios";

interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User {
    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
    public attributes: Attributes<UserProps>;

    // we have a different syntax for Attributes because it expects some data during initialization and we will receive that data (attributes) as constructor of this class itself
    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs);
    }

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    get get() {
        return this.attributes.get;
    }

    set(update: UserProps) {
        this.attributes.set(update);
        this.trigger("change");
    }

    fetch(): void {
        const id = this.attributes.get("id");

        if (!id) throw new Error("ID is required !");

        // const data = (await this.sync.fetch(id)) as UserProps;
        // this.set(data);

        this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.set(response.data);
        });
    }

    save(): void {
        const data = this.attributes.getAll();
        this.sync
            .save(data)
            .then((response: AxiosResponse): void => {
                this.trigger("save");
            })
            .catch((): void => {
                this.trigger("error");
            });
    }
}
*/
