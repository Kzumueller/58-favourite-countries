"use server"

import {PrismaClient, FavouriteCountry} from ".prisma/client";

export const getFavouriteCountries = async (user_id: string): Promise<FavouriteCountry[]> => {
  const prismaClient = new PrismaClient();

  return prismaClient.favouriteCountry.findMany({ where: { user_id } });
}