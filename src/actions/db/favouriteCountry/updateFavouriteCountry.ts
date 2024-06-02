"use server"

import {FavouriteCountry, PrismaClient} from ".prisma/client";

type Patch = Partial<Pick<FavouriteCountry, "user_id" | "country_id" | "notes">>

/**
 * updates the favourite country with the given id using the given patch
 * @param id
 * @param patch
 */
export const updateFavouriteCountry = async (id: string, patch: Patch): Promise<FavouriteCountry> => {
  const prismaClient = new PrismaClient();

  return prismaClient.favouriteCountry.update({
    where: { id },
    data: patch
  });
}