import EpisodePlayer from "./EpisodePlayer";
import { getContrastColor } from "../utils/contrast-color";
import Layout from "../components/Layout";
import Image from "next/image";
import getPodcast from "../libs/db/podcast";
import getEpisodes from "../libs/db/episodes";

import applePodcastBadge from "../public/apple-podcast-badge.svg";
import spotifyPodcastBadge from "../public/spotify-podcast-badge.svg";
import CopyToClipboard from "./admin/CopyToClipboard";

export default async function Home() {
  const podcast = await getPodcast();
  const episodes = await getEpisodes();
  return (
    <Layout
      style={{
        backgroundColor: podcast.homepageBackgroundColor,
        color: getContrastColor(podcast.homepageBackgroundColor),
      }}
      className={
        "flex items-center min-h-screen flex-col space-y-3 pt-10 md:pt-16"
      }
    >
      <Image
        className={"rounded-3xl"}
        src={podcast.logoUrl}
        alt={podcast.logoAlt}
        width={200}
        height={200}
        priority={true}
      />
      <h1 className={"text-3xl sm:text-5xl text-center"}>{podcast.name}</h1>
      <span>{podcast.description}</span>
      <div
        className={
          "grid gap-2 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-6"
        }
      >
        <a
          href={
            "https://podcasts.apple.com/de/podcast/lammgeplauder-podcast/id1544078980"
          }
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image
            src={applePodcastBadge}
            alt={"Anhören auf Apple Podcast"}
            height={50}
          />
        </a>
        <a
          href={"https://open.spotify.com/show/7lr8TBhdwTH6EzbNBxvKXM"}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image
            src={spotifyPodcastBadge}
            alt={"Anhören auf Spotify"}
            height={50}
          />
        </a>

        <CopyToClipboard/>
      </div>

      <div className={"p-8 max-w-3xl"}>
        <h2 className={"text-2xl sm:text-3xl mb-2"}>{"Episoden"}</h2>
        {episodes
          .map((episode) => (
            <EpisodePlayer
              key={episode.id}
              className={"mt-6 mb-24"}
              episode={episode}
            />
          ))}
      </div>
    </Layout>
  );
}
