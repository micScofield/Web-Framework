import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const rootUrl = "http://localhost:3000";

export class User {
    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
    public attributes: Attributes<UserProps>;

    // we have a different syntax for Attributes because it expects some data during initialization and we will receive that data (attributes) as constructor of this class itself
    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs);
    }
}
