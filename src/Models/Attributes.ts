/*
Note: 
1. Advanced Generic Constraint
<K extends keyof T>(key: K): T[K]
K extends keyof T means that the value of "K" can only be a key of an object "T", and obviously the return value can be set to T[K] instead of a union which we had earlier (eg: string | number | boolean). 

2. Why use arrow function for get ? 
If we used normal function syntax, it would have its own reference of "this" and when we try to use passthrough functionality on it (eg: calling user.get('name')), it would reference "user" as "this" which would throw an error. Instead its "this" should be referencing to the class's "this".

IMPORTANT - Point 2 needs to be fixed for all composite classes where we are referencing "this". Convert all to arrow functions
*/

export class Attributes<T> {
    constructor(private data: T) {}

    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    }

    set(update: T): void {
        Object.assign(this.data, update);
    }

    getAll(): T {
        return this.data;
    }
}