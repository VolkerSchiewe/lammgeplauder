import { NextApiRequest, NextApiResponse } from "next";
import Podcast from 'podcast';
import { getGraphqlClient } from "../../utils/graphql-client";
import { gql } from "graphql-request";
import absoluteUrl from "next-absolute-url/index";

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
      description: string
      updatedAt: string
    }>

}

const feedApi = async (req: NextApiRequest, res: NextApiResponse) => {
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
        description
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
  const { origin } = absoluteUrl(req)
  const feed = new Podcast({
    title: podcast.title,
    feedUrl: "",
    description: podcast.description,
    siteUrl: origin,
    author: "EBU-Jugend",
    language: "de-DE",
    imageUrl: podcast.logo.url,
    itunesCategory: [{ text: podcast.categories.join(" &amp; ") }],
    itunesOwner: {
      name: "EBU-Jugend",
      email: "info@lammgeplauder.de"
    }
  });

  allEpisodes.forEach(episode => {
    const guid = episode.name.toLowerCase().replace(" ", "-")
    feed.addItem({
      title: episode.name,
      guid: guid,
      enclosure: {
        url: episode.audio.url,
        size: episode.audio.size,
        type: episode.audio.mimeType
      },
      date: episode.updatedAt,
      description: episode.description,
      url: `${ origin }#${ guid }`
    });
  })

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml')
  res.end(feed.buildXml(" "))
}
export default feedApi
