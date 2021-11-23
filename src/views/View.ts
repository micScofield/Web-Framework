// IMPORTANT - 1. A workaround if we don't want to use Model from "../models/Model" is to use ModelForView. But it is not ideal. Model however is also a Generic class which expects an interface eg: UserProps. So when creating a child class out of this, we can specify User and UserProps as two generic types. 
// 2. To have an method which may or may not be implemented by child class (i.e. optional), we can use 2nd implementation of eventsMap. If its a must we can use 1st one which is commented out.

import { Model } from "../models/Model";

type Callback = () => void;

interface ModelForView {
    on(eventName: string, callback: Callback): void;
}

export abstract class View<T extends Model<K>, K> {
    regions: { [key: string]: Element } = {};

    constructor(public parent: Element, public model: T) {
        this.bindModel();
    }

    // abstract eventsMap(): { [key: string]: () => void };

    eventsMap(): { [key: string]: () => void } {
      return {}
    }

    abstract template(): string;

    regionsMap(): { [key: string]: string } { // eg: { 'UserShow': '.user-show' }
      return {}
    }

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
