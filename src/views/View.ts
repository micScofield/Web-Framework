import { Model } from "../models/Model";

type Callback = () => void;

// IMPORTANT - A workaround if we don't want to use Model from "../models/Model". But it is not ideal. Model however is also a Generic class which expects an interface eg: UserProps. So when creating a child class out of this, we can specify User and UserProps as two generic types.
interface ModelForView {
    on(eventName: string, callback: Callback): void;
}

export abstract class Form<T extends Model<K>, K> {
    constructor(public parent: Element, public model: T) {
        this.bindModel();
    }

    abstract eventsMap(): { [key: string]: () => void };
    abstract template(): string;

    bindModel(): void {
        this.model.on("change", () => {
            this.render();
        });
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(":");

            fragment.querySelectorAll(selector).forEach((element) => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }

    render(): void {
        this.parent.innerHTML = "";

        const templateElement = document.createElement("template");
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    }
}
