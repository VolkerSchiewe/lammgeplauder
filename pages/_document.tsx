import React from "react";
import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang={ "de" }>
        <Head>
          <meta name="description"
                content={ "Lammgeplauder ist ein Podcast der Jugend der evangelischen Brüder-Unität - Herrnhuter Brüdergemeine. Wir wollen gemeinsam Themen, wie Nachhaltigkeit, Rechtsextremismus, Mission in der EBU heutzutage und viele andere Themen, die uns in der Jugend beschäftigen nach außen bringen, sodass alle Gemeindemitglieder, egal welchen Alters, in der Lage sind, sich auch mit diesen Themen auseinander zu setzen." }/>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/manifest.json"/>
          <meta name="msapplication-TileColor" content="#ffffff"/>
          <meta name="theme-color" content="#ffffff"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument
