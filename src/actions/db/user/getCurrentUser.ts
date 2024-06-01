"use server"

import {cookies} from "next/headers";
import {PrismaClient, User} from "@prisma/client";
import {verifyToken} from "@/src/lib/verifyToken";

export const getCurrentUser = async (): Promise<User | null> => {
  const token = cookies().get("token")?.value;

  try {
    const { id } = await verifyToken<{id: string}>(token!);

    const prismaClient = new PrismaClient();

    return prismaClient.user.findFirst({where: {id}});
  } catch(error) {
    console.error(error);

    return null;
  }
}