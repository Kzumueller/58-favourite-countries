"use server"

import { PrismaClient, Country } from ".prisma/client"

export const getCountries = async (): Promise<Country[]> => {
  const prismaClient = new PrismaClient();

  return prismaClient.country.findMany();
}