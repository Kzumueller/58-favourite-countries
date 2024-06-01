"use server"

import {PrismaClient} from "@prisma/client";

/**
 * returns whether the given userName is unique to the system
 * @param username
 */
export const validateUserName = async (username: string) => {
  const prismaClient = new PrismaClient();

  const result = await prismaClient.user.count({ where: { username } });

  return result === 0; // a count of 0 means it's still available and doesn't exist yet
}