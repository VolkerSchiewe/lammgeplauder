import Layout from '../components/Layout'
import React from "react";
import Image from "next/image"
import absoluteUrl from "next-absolute-url/index";

const HomePage = () => {
  async function copyFeedToClipboard() {
    const { origin } = absoluteUrl()
    await navigator.clipboard.writeText(`${ origin }/api/feed`)
  }

  return (
    <Layout className={ "flex items-center h-screen flex-col bg-orange-300 space-y-3 pt-10 md:pt-16" }>
      <Image className={ "rounded-full" } src={ "/lammgeplauder-logo-without-label.png" }
             alt={ "Lamm mit Telefonhörer" }
             width={ 200 } height={ 200 }/>
      <h1 className={ "text-3xl sm:text-5xl text-center" }>Lammgeplauder Podcast</h1>
      <span>Ein Podcast der EBU-Jugend</span>
      <div className={ "grid gap-x-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" }>
        <a href={ "" }>
          <Image src={ "/google-podcast-badge.svg" } alt={ "Bei Google Podcast anhören" } width={ 200 }
                 height={ 50 }/>
        </a>
        <a href={ "https://podcasts.apple.com/de/podcast/lammgeplauder-podcast/id1544078980" }>
          <Image src={ "/apple-podcast-badge.svg" } alt={ "Anhören auf Apple Podcast" } width={ 200 } height={ 50 }/>
        </a>
        <a href={ "https://open.spotify.com/show/7lr8TBhdwTH6EzbNBxvKXM" }>
          <Image src={ "/spotify-podcast-badge.svg" } alt={ "Anhören auf Spotify" } width={ 200 } height={ 50 }/>
        </a>

        <div style={ { width: 200, height: 50 } } onClick={ copyFeedToClipboard }
             className={ "border border-gray-600 rounded-md bg-white flex justify-center items-center cursor-pointer" }>
          <svg className="w-6 h-6 m-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 }
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
          </svg>
          { "Feed - URL kopieren" }
        </div>
      </div>
    </Layout>
  );
}

export default HomePage
