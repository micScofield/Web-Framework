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
}
