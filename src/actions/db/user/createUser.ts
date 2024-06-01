"use server"

import * as bcrypt from "bcryptjs"
import {PrismaClient, User} from "@prisma/client";

/**
 * Creates and returns a new user based on the given data
 * hashes the password
 * @param userData
 */
export const createUser = async ({ username, password }: Pick<User, "username"| "password">): Promise<User> => {
  const prismaClient = new PrismaClient();

  const hash = bcrypt.hashSync(password, 10);

  const newUser: User = await prismaClient.user.create({
    data: { username, password: hash }
  });

  return newUser as User;
}