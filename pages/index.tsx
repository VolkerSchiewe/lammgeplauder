import Layout from '../components/Layout'
import React from "react";
import Image from "next/image"

const HomePage = () => (
  <Layout className={ "flex items-center h-screen flex-col bg-orange-300 space-y-3 pt-16" }>
    <Image className={ "rounded-full" } src={ "/lammgeplauder-logo-without-label.png" } alt={ "Lamm mit Telefonhörer" }
           width={ 200 } height={ 200 }/>
    <h1 className={ "text-3xl sm:text-5xl text-center" }>Lammgeplauder Podcast</h1>
    <span>Ein Podcast der EBU-Jugend</span>
    <div className={ "grid gap-5 grid-cols-3" }>
      <a href={ "" }>
        <Image src={ "/google-podcast-badge.svg" } alt={ "Bei Google Podcast anhören" } width={ 200 } height={ 100 }/>
      </a>
      <a href={ "" }>
        <Image src={ "/apple-podcast-badge.svg" } alt={ "Anhören auf Apple Podcast" } width={ 200 } height={ 100 }/>
      </a>
      <a href={ "https://open.spotify.com/show/7lr8TBhdwTH6EzbNBxvKXM" }>
        <Image src={ "/spotify-podcast-badge.svg" } alt={ "Anhören auf Spotify" } width={ 200 } height={ 100 }/>
      </a>
    </div>
  </Layout>
)

export default HomePage
