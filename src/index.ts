import { User } from "./models/User";

const collection = User.buildUserCollection()

collection.on("change", () => {
    console.log("Changed", collection);
});

collection.fetch();
