import {GraphQLClient} from "graphql-request";

/** client for connecting to the countries GQL API */
export const client = new GraphQLClient(process.env.GQL_COUNTRIES_ENDPOINT!)