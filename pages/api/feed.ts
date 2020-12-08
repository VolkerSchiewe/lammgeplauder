import { NextApiRequest, NextApiResponse } from "next";
import Podcast from 'podcast';

interface DatoCmsResponse {
  data: Array<{ attributes: { name: string, audio: { path: string } } }>

}

const feedApi =async (_req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.DATOCMS_API_TOKEN){
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
    siteUrl: "https://lammgeplauder.de",
    author: "EBU-Jugend",
  });
  data.forEach(record => {
    feed.addItem({
      title: record.attributes.name,
      url: "https://www.datocms-assets.com" + record.attributes.audio.path,
    });
  })

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml')
  res.end(feed.buildXml(" "))
}
export default feedApi
