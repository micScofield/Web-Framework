import axios, { AxiosResponse } from "axios";

import { Eventing } from "./Eventing";

export class Collection<T, U> {
    constructor(public rootUrl: string, public deserialize: (json: U) => T) {}

    models: T[] = [];

    events: Eventing = new Eventing();

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    fetch(): void {
        axios.get(this.rootUrl).then((response: AxiosResponse) => {
            response.data.forEach((value: U) => {
                const data = this.deserialize(value);
                // const user = T.buildUser(value);
                this.models.push(data);
            });
        });

        this.trigger("change");
    }
}
