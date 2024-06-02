"use server"

import {PrismaClient} from ".prisma/client";

/**
 * deletes the favourite country with the given id
 * @param id
 */
export const deleteFavouriteCountry = async (id: string): Promise<void> => {
  const prismaClient = new PrismaClient();

  prismaClient.favouriteCountry.delete({ where: { id } });
}