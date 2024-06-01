import { gql } from "graphql-request"
import {client} from "@/src/actions/gql/client";
import {PrismaClient, Country} from "@prisma/client";

const query = gql`{
  countries {
    edges {
      node {
        id
        name
        capital
        population
        alpha3Code
      }
    }
  }
}`

type Node = {
  id: string;
  name: string;
  capital: string;
  population: number;
  alpha3Code: string;
}

/**
 * fetches relevant data on all the countries on God's green earth
 * and transforms it for efficient storage
 */
export const fetchCountries = async () => {
  const prismaClient = new PrismaClient();

  const count = await prismaClient.country.count()

  if(count !== 0) return; // countries have already been fetched

  const data: any = await client.request(query)

  const countries: Country[] = data.countries.edges.map(({ node: { id, name, capital, population, alpha3Code } }: { node: Node }) => ({
    id: Number(atob(id).split(":")[1]), // ids are base64 encoded as "CountryCode:<index>"
    name,
    capital,
    population,
    flag: `${alpha3Code.toLowerCase()}.svg` // append to env var NEXT_PUBLIC_FLAG_URL
  }));

  await prismaClient.country.createMany({ data: countries });
}