import { GraphQLClient } from "graphql-request";
import { PROJECT_ID } from "./env.ts";

export const endpoint = `https://api-us-west-2.hygraph.com/v2/${PROJECT_ID}/master`;
export const client = new GraphQLClient(endpoint);
