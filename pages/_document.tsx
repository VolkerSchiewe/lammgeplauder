import React from "react";
import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang={ "de" }>
        <Head>
          <meta name="description"
                content={ "Lammgeplauder ist ein Podcast der Jugend der evangelischen Brüder-Unität - Herrnhuter Brüdergemeine. Wir wollen gemeinsam Themen, wie Nachhaltigkeit, Rechtsextremismus, Mission in der EBU heutzutage und viele andere Themen, die uns in der Jugend beschäftigen nach außen bringen, sodass alle Gemeindemitglieder, egal welchen Alters, in der Lage sind, sich auch mit diesen Themen auseinander zu setzen." }/>
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
