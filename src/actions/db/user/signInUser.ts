"use server"

import { SignJWT } from "jose"

import * as bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client"

/**
 * validates the given credentials and returns a JWT on success, null otherwise
 * if this action returns null, signing in failed
 * @param username
 * @param password
 */
export const signInUser = async (username: string, password: string): Promise<string|null> => {
  const prismaClient = new PrismaClient();

  const user = await prismaClient.user.findFirst({ where: { username } });

  if(!user) return null;

  if(!bcrypt.compareSync(password, user.password)) return null;

  //const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const secret = Uint8Array.from(process.env.JWT_SECRET!.split("").map(x => x.charCodeAt(0)))

  return new SignJWT({ id: user.id})
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}