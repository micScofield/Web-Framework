import { User } from "./models/User";

const user = new User({ name: "Test Save", age: 0 });

user.on("change", () => {
    console.log("change!", user);
});

user.save();

user.on("save", () => {
    console.log("User Saved", user);
});
