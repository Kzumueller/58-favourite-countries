import { gql } from "graphql-request"
import {client} from "@/src/actions/gql/client";
import {db} from "@/src/actions/db/db";
import format from "pg-format";

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

export const fetchCountries = async () => {
  const countQuery = await db.query("select count(*) as count from countries");

  if(countQuery.rows[0]["count"] !== "0") return; // countries have already been fetched

  const data: any = await client.request(query)

  const countries: (string|number)[][] = data.countries.edges.map(({ node: { id, name, capital, population, alpha3Code } }: { node: Node }) => ([
    Number(atob(id).split(":")[1]), // ids are base64 encoded as "CountryCode:<index>"
    name,
    capital,
    population,
    `${alpha3Code.toLowerCase()}.svg` // append to env var NEXT_PUBLIC_FLAG_URL
  ]));

  await db.query(format("insert into countries (id, name, capital, population, flag) values %L", countries));
}