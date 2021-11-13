// teaches GENERIC CONSTRAINT (T extends HasId) - HasId constraint around generic class Sync

import axios, { AxiosPromise } from "axios";

interface HasId {
    id?: number
}

export class ApiSync<T extends HasId> {
    constructor(public rootUrl: string) {}

    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}/${id}`);
    }

    save(data: T): AxiosPromise {
        const { id } = data; // an interface is added so that TS understands inside data we are definitely going to have an ID

        // id can be a number | undefined here, using a if check helps TS understand what we want for either of these conditions
        if (id) {
            return axios.put(`${this.rootUrl}/${id}`, data);
        } else {
            return axios.post(`${this.rootUrl}`, data);
        }
    }
}
