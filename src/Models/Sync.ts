import axios, { AxiosResponse } from "axios";

export class Sync<T> {
    data: T;

    constructor(public rootUrl: string) {}

    fetch(id: number): void {
        axios
            .get(`${this.rootUrl}/${id}`)
            .then((response: AxiosResponse): void => {
                this.data = response.data;
            });
    }

    save(data: T, id?: number): void {
        if (id) {
            axios.put(`${this.rootUrl}/${id}`, data);
        } else {
            axios.post(`${this.rootUrl}`, data);
        }
    }
}
