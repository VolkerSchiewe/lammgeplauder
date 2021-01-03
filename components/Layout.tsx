import React, { CSSProperties, ReactNode } from 'react'
import Head from 'next/head'
import Link from "next/link"

type Props = {
  children?: ReactNode
  title?: string
  className?: string
  style?: CSSProperties
}

const Layout = ({ children, title = 'Lammgeplauder Podcast', className, style }: Props) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      <link type="application/rss+xml" rel="alternate" title="Podcast Feed: Lammgeplauder Podcast"
            href="https://lammgeplauder.de/api/feed"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
    </Head>
    <div className={ className } style={ style }>
      { children }
    </div>
    <footer className={ "bg-black text-white flex justify-end px-2 py-1 space-x-3 w-full" }>
      <Link href={ "/admin" }>{ "Admin" }</Link>
      <a href={ "https://jugend.ebu.de/impressum-datenschutz" }>{ "Impressum" }</a>
    </footer>
  </div>
)

export default Layout
