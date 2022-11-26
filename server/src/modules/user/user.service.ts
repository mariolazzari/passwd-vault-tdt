import crypto from "crypto";
import { UserModel } from "./user.model";

interface ICreateUser {
  username: string;
  password: string;
}

// generate salt
export function generateSalt() {
  return crypto.randomBytes(64).toString("hex");
}

// create new user
export async function createUser(user: ICreateUser) {
  const newUser = UserModel.create(user);

  return newUser;
}
