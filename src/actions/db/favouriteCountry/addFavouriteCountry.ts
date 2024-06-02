"use server"

import {PrismaClient, FavouriteCountry} from "@prisma/client";

/**
 * creates a new favourite country for the given user and returns the created object
 * @param user_id
 * @param country_id
 * @param notes
 */
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