import {GraphQLClient} from "graphql-request";

export const client = new GraphQLClient(process.env.GQL_COUNTRIES_ENDPOINT!)