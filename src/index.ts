import { User } from "./models/User";

const user = new User({ name: "Sanyam", age: 22 });

user.on("change", () => {
    console.log("change!");
});

user.set({ name: "SJ" });

console.log(user.get("name"));
