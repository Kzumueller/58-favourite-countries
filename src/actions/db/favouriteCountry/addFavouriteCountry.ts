"use server"

import {PrismaClient, FavouriteCountry} from "@prisma/client";

export const addFavouriteCountry = async (user_id: string, country_id: number, notes: string): Promise<FavouriteCountry> => {
  const prismaClient = new PrismaClient();

  return prismaClient.favouriteCountry.create({
    data: {
      user_id,
      country_id,
      notes
    }
  })
}