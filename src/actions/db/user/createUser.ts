"use server"

import * as bcrypt from "bcryptjs"
import {db} from "@/src/actions/db/db";

export type UserData = {
  id?: string;
  username: string;
  password: string;
}

/**
 * Creates and returns a new user based on the given data
 * @param userData
 */
export const createUser = async (userData: UserData)=> {
  const hash = bcrypt.hashSync(userData.password, 10);

  const newUser = await db.query("insert into users (username, password) values ($1, $2)", [userData.username, hash]);

  return newUser.rows[0];
}