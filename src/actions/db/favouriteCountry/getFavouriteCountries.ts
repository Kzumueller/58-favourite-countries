"use server"

import {PrismaClient, FavouriteCountry} from ".prisma/client";

/**
 * returns all favourite countries for the given user_id
 * @param user_id
 */
export const getFavouriteCountries = async (user_id: string): Promise<FavouriteCountry[]> => {
  const prismaClient = new PrismaClient();

  return prismaClient.favouriteCountry.findMany({ where: { user_id } });
}