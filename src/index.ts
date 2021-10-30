import { User } from "./User"

const user = new User({ username: 'Brad', age: 12 })

console.log(user)
console.log(user.get('username'))