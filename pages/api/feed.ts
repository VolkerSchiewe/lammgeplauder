import { NextApiRequest, NextApiResponse } from "next";
import Podcast from 'podcast';

interface DatoCmsResponse {
  data: Array<{
    attributes: {
      name: string, audio: {
        format: string;
        size: string;
        path: string
      }, updated_at: string
    }
  }>

}

const feedApi = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.DATOCMS_API_TOKEN) {
    res.statusCode = 500
    res.end("Configuration Error")
    return
  }
  const { data }: DatoCmsResponse = await fetch("https://site-api.datocms.com/items", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${ process.env.DATOCMS_API_TOKEN }`,
      "Accept": "application/json",
    }
  }).then(res => res.json())
  const feed = new Podcast({
    title: "Lammgeplauder Podcast",
    feedUrl: "",
    description: "Ein Podcast der EBU-Jugend",
    siteUrl: "https://lammgeplauder.de",
    author: "EBU-Jugend",
    language: "de-DE",
  });
  data.forEach(record => {
    feed.addItem({
      title: record.attributes.name,
      enclosure: {
        url: "https://www.datocms-assets.com" + record.attributes.audio.path,
        size: record.attributes.audio.size,
        type: `audio/${ record.attributes.audio.format }`
      },
      date: record.attributes.updated_at
    });
  })

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml')
  res.end(feed.buildXml(" "))
}
export default feedApi
