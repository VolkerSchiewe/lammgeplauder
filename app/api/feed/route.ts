import { Podcast } from "podcast";
import getEpisodes from "../../../libs/db/episodes";
import getPodcast from "../../../libs/db/podcast";
import { getEpisodeGuid } from "../../../utils/getEpisodeGuid";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);

  const episodes = await getEpisodes();
  const podcast = await getPodcast();
  const feed = new Podcast({
    title: podcast.name,
    feedUrl: url.href,
    description: podcast.description,
    siteUrl: url.origin,
    author: "EBU Jugend",
    language: "de-DE",
    imageUrl: podcast.logoUrl,
    itunesCategory: [
      { text: "Religion & Spirituality", subcats: [{ text: "Christianity" }] },
    ],
    itunesOwner: {
      name: "EBU Jugend",
      email: "info@lammgeplauder.de",
    },
  });

  for (const episode of episodes) {
    if (!episode.published) continue;
    const guid = getEpisodeGuid(episode.name, episode.audio.md5Hash);
    feed.addItem({
      title: episode.name,
      guid: guid,
      enclosure: {
        url: episode.audio.url,
        size: episode.audio.size,
        type: episode.audio.mimeType,
      },
      date: episode.publishingDate,
      description: episode.description,
      itunesDuration: episode.audio.duration,
      url: `${url.href}#${guid}`,
    });
  }
  return new Response(feed.buildXml({ indent: " " }), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
