import Layout from "../components/Layout";
import React, { useState } from "react";
import Image from "next/image";
import absoluteUrl from "next-absolute-url/index";
import { GetStaticProps, NextPage } from "next";
import { getContrastColor } from "../utils/contrast-color";
import getPodcast from "../utils/db/podcast";
import EpisodePlayer from "../components/EpisodePlayer";
import getEpisodes from "../utils/db/episodes";
import { Episode } from "../types/models";
import googlePodcastBadge from "../public/google-podcast-badge.svg";
import applePodcastBadge from "../public/apple-podcast-badge.svg";
import spotifyPodcastBadge from "../public/spotify-podcast-badge.svg";

interface Props {
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  backgroundColor: string;
  episodes: Array<Episode>;
}

const HomePage: NextPage<Props> = ({
  title,
  description,
  logo,
  logoAlt,
  backgroundColor,
  episodes,
}) => {
  const [notificationOpen, openNotification] = useState(false);

  async function copyFeedToClipboard() {
    const { origin } = absoluteUrl();
    await navigator.clipboard.writeText(`${origin}/api/feed`);
    openNotification(true);
    setTimeout(() => openNotification(false), 2000);
  }

  return (
    <Layout
      style={{
        backgroundColor: backgroundColor,
        color: getContrastColor(backgroundColor),
      }}
      className={
        "flex items-center min-h-screen flex-col space-y-3 pt-10 md:pt-16"
      }
    >
      <Image
        className={"rounded-3xl"}
        src={logo}
        alt={logoAlt}
        width={200}
        height={200}
        priority={true}
      />
      <h1 className={"text-3xl sm:text-5xl text-center"}>{title}</h1>
      <span>{description}</span>
      <div
        className={
          "grid gap-2 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-6"
        }
      >
        <a
          href={
            "https://podcasts.google.com/feed/aHR0cHM6Ly9sYW1tZ2VwbGF1ZGVyLmRlL2FwaS9mZWVk?sa=X&ved=0CAMQ4aUDahcKEwig-KGuncbtAhUAAAAAHQAAAAAQAQ&hl=de"
          }
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image
            src={googlePodcastBadge}
            alt={"Bei Google Podcast anhören"}
            height={50}
          />
        </a>
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

        <div
          style={{ width: 200, height: 50 }}
          onClick={copyFeedToClipboard}
          className={
            "border border-gray-600 rounded-md bg-white flex justify-center items-center cursor-pointer text-black"
          }
        >
          <svg
            className="w-6 h-6 m-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          {"Feed - URL kopieren"}
        </div>
      </div>
      <div
        className={`text-black absolute w-full flex justify-end items-start p-5 ${
          notificationOpen ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500 ease-out `}
      >
        <div className=" bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
          <div className="flex flex-row">
            <div className="px-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1792 1792"
                fill="#44C997"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
              </svg>
            </div>
            <div className="ml-2 mr-6">
              <span className="font-semibold">Feed-Url kopiert!</span>
            </div>
          </div>
        </div>
      </div>
      <div className={"p-8 max-w-3xl"}>
        <h2 className={"text-2xl sm:text-3xl mb-2"}>{"Episoden"}</h2>
        {episodes
          .sort((e1, e2) => (e1.publishingDate > e2.publishingDate ? 1 : -1))
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
};

export const getStaticProps: GetStaticProps = async () => {
  const podcast = await getPodcast();
  const episodes = await getEpisodes();
  return {
    props: {
      title: podcast.name,
      description: podcast.description,
      logo: podcast.logoUrl,
      logoAlt: podcast.logoAlt,
      backgroundColor: podcast.homepageBackgroundColor,
      episodes: episodes.filter(e => e.published),
    },
    revalidate: 3600, // seconds (equals 1 hour)
  };
};
export default HomePage;
