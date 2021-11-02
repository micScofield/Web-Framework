import axios, { AxiosResponse } from "axios";

export class Sync<T> {
    data: T;

    fetch(id: number): void {
        axios
            .get(`http://localhost:3000/users/${id}`)
            .then((response: AxiosResponse): void => {
                this.data = response.data;
            });
    }

    save(data: T, id?: number): void {
        if (id) {
            axios.put(`http://localhost:3000/users/${id}`, data);
        } else {
            axios.post("http://localhost:3000/users", data);
        }
    }
}
