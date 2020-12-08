import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
  className?:string
}

const Layout = ({ children, title = 'Lammgeplauder Podcast', className }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link type="application/rss+xml" rel="alternate" title="Podcast Feed: Lammgeplauder Podcast" href="https://lammgeplauder.de/api/feed"/>
    </Head>
    <div className={className}>
    {children}
    </div>
  </div>
)

export default Layout
