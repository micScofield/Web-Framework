import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";

const usersUrl = "http://localhost:3000/users";

const collection = new Collection<User, UserProps>(
    usersUrl,
    (json: UserProps) => User.buildUser(json)
);

collection.on("change", () => {
    console.log("Changed", collection);
});

collection.fetch();
