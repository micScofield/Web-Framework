/*
Note: Advanced Generic Constraint
<K extends keyof T>(key: K): T[K]
K extends keyof T means that the value of "K" can only be a key of an object "T", and obviously the return value can be set to T[K] instead of a union which we had earlier (eg: string | number | boolean). 
*/

export class Attributes<T> {
    constructor(private data: T) {}

    get<K extends keyof T>(key: K): T[K] {
        return this.data[key];
    }

    set(update: T): void {
        Object.assign(this.data, update);
    }
}