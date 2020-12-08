import { GraphQLClient } from "graphql-request";

export function getGraphqlClient(): GraphQLClient {
  if (!process.env.DATOCMS_API_TOKEN)
    throw new Error("CMS API Token missing!")
  return new GraphQLClient("https://graphql.datocms.com/", {
    headers: {
      authorization: `Bearer ${ process.env.DATOCMS_API_TOKEN }`,
    },
  })
}
