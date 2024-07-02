import React, { CSSProperties, ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
  className?: string
  style?: CSSProperties
}

const Layout = ({ children, title = 'Lammgeplauder Podcast', className, style }: Props) => (
  <div>
    <Head>
      <meta charSet="utf-8"/>
      <link type="application/rss+xml" rel="alternate" title="Podcast Feed: Lammgeplauder Podcast"
            href="https://lammgeplauder.de/api/feed"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
    </Head>
    <div className={ className } style={ style }>
      { children }
    </div>
  </div>
)

export default Layout
