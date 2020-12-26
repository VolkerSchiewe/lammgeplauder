import { NextApiRequest, NextApiResponse } from "next";
import Podcast from 'podcast';
import absoluteUrl from "next-absolute-url/index";
import getEpisodes from "../../utils/db/episodes";
import getPodcast from "../../utils/db/podcast";

const feedApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const episodes = await getEpisodes()
  const podcast = await getPodcast()
  const { origin } = absoluteUrl(req)
  const feed = new Podcast({
    title: podcast.name,
    feedUrl: `${ origin }/api/feed`,
    description: podcast.description,
    siteUrl: origin,
    author: "EBU-Jugend",
    language: "de-DE",
    imageUrl: podcast.logoUrl,
    itunesCategory: [{ text: "Religion & Spirituality", subcats: [{ text: "Christianity" }] }],
    itunesOwner: {
      name: "EBU-Jugend",
      email: "info@lammgeplauder.de"
    }
  });

  for (const episode of episodes) {
    const hash = episode.audio.md5Hash.slice(0, 10)
    const guid = `${ episode.name.toLowerCase().replace(" ", "-") }-${ hash }`
    feed.addItem({
      title: episode.name,
      guid: guid,
      enclosure: {
        url: episode.audio.url,
        size: episode.audio.size,
        type: episode.audio.mimeType
      },
      date: episode.updatedAt.toDate().toISOString(),
      description: episode.description,
      itunesDuration: episode.audio.duration,
      url: `${ origin }#${ guid }`
    });
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml')
  res.end(feed.buildXml(" "))
}
export default feedApi
