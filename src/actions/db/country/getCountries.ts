"use server"

import { PrismaClient, Country } from ".prisma/client"

/** returns the list of all available countries */
export const getCountries = async (): Promise<Country[]> => {
  const prismaClient = new PrismaClient();

  return prismaClient.country.findMany();
}