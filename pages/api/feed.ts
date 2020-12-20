import { NextApiRequest, NextApiResponse } from "next";
import Podcast from 'podcast';
import { getGraphqlClient } from "../../utils/graphql-client";
import { gql } from "graphql-request";
import absoluteUrl from "next-absolute-url/index";
import getAudioDurationInSeconds from "get-audio-duration";
import { Episode, Podcast as PodcastType } from "../../types/dato-cms";
import { getShortHash } from "../../utils/hash";

interface DatoCmsResponse {
  podcast: PodcastType
  allEpisodes: Array<Episode>
}

const feedApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = getGraphqlClient()

  const query = gql`
    {
      podcast{
        title
        description
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
    itunesCategory: [{ text: "Religion & Spirituality", subcats: [{ text: "Christianity" }] }],
    itunesOwner: {
      name: "EBU-Jugend",
      email: "info@lammgeplauder.de"
    }
  });

  for (const episode of allEpisodes) {
    const hash = await getShortHash("md5", episode.audio.url)
    const guid = `${ episode.name.toLowerCase().replace(" ", "-") }-${ hash }`
    const duration = await getAudioDurationInSeconds(episode.audio.url)
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
      itunesDuration: duration,
      url: `${ origin }#${ guid }`
    });
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml')
  res.end(feed.buildXml(" "))
}
export default feedApi
