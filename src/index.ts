import { User } from "./Models/User";

const user = new User({ username: "Brad", age: 12 });

console.log(user);
console.log(user.get("username"));

user.set({ age: 21 });
user.on("test", () => console.log("test"));
user.on("test", () => console.log("test2"));
user.trigger('test');
console.log(user);
