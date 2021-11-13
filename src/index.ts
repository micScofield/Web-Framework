import { Collection } from "./models/Collection";

const collection = new Collection("http://localhost:3000/users");

collection.on("change", () => {
    console.log("Changed", collection);
});

collection.fetch();
