interface UserProps {
    username: string
    age: number
}

export class User {
    constructor(private data: UserProps) {}

    get(propName: string): ( number | string ) {
        return this.data[propName];
    }
}