import { NextApiRequest, NextApiResponse } from "next";
import Podcast from 'podcast';
import absoluteUrl from "next-absolute-url/index";
import { Episode, Podcast as PodcastType } from "../../types/models";
import initFirebase from "../../utils/firebase-admin";
import { firestore } from "firebase-admin"

const feedApi = async (req: NextApiRequest, res: NextApiResponse) => {
  initFirebase()
  const db = firestore()
  const episodesCollection = await db.collection("episodes").get()
  const podcast = (await db.collection("podcast").doc("Lammgeplauder").get()).data() as PodcastType
  const episodes: Array<Episode> = []
  episodesCollection.forEach((doc) => {
    const data = doc.data() as Episode;
    episodes.push(data)
  })

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
