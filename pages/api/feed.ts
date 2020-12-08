import { NextApiRequest, NextApiResponse } from "next";
import Podcast from 'podcast';
import { getGraphqlClient } from "../../utils/graphql-client";
import { gql } from "graphql-request";

interface DatoCmsResponse {
  podcast: {
    title: string
    description: string
    categories: string[]
    logo: {
      url: string
    }
  }
  allEpisodes:
    Array<{
      name: string,
      audio: {
        mimeType: string;
        size: string;
        url: string
      },
      updatedAt: string
    }>

}

const feedApi = async (_req: NextApiRequest, res: NextApiResponse) => {
  const client = getGraphqlClient()
  const query = gql`
    {
      podcast{
        title
        description
        categories
        logo {
          url
        }
      }
      allEpisodes {
        name
        updatedAt
        audio {
          url
          size
          mimeType
        }
      }
    }
  `
  const { podcast, allEpisodes } = await client.request<DatoCmsResponse>(query)

  const feed = new Podcast({
    title: podcast.title,
    feedUrl: "",
    description: podcast.description,
    siteUrl: "https://lammgeplauder.de",
    author: "EBU-Jugend",
    language: "de-DE",
    imageUrl: podcast.logo.url,
    itunesCategory: podcast.categories.map(cat => ({ text: cat })),
    itunesOwner: {
      name: "EBU-Jugend",
      email: "info@lammgeplauder.de"
    }
  });

  allEpisodes.forEach(episode => {
    feed.addItem({
      title: episode.name,
      enclosure: {
        url: episode.audio.url,
        size: episode.audio.size,
        type: episode.audio.mimeType
      },
      date: episode.updatedAt
    });
  })

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml')
  res.end(feed.buildXml(" "))
}
export default feedApi
