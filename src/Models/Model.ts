import { AxiosPromise, AxiosResponse } from "axios";

type Callback = () => void;

interface Events {
    on(eventName: string, callback: Callback): void;
    trigger(eventName: string): void;
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface ModelAttributes<T> {
    set(value: T): void;
    get<K extends keyof T>(key: K): T[K];
    getAll(): T;
}

interface HasId {
    id?: number
}

export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ) {}

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    get get() {
        return this.attributes.get;
    }

    set(update: T) {
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
