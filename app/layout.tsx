import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "../styles/tailwind.css";

import { SESSION_COOKIE_NAME } from "../constants";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: '#ffffff',
}
 
export const metadata: Metadata = {
  title: "Lammgeplauder Podcast",
  description: "Lammgeplauder ist ein Podcast der Jugend der evangelischen Brüder-Unität - Herrnhuter Brüdergemeine. Wir wollen gemeinsam Themen, wie Nachhaltigkeit, Rechtsextremismus, Mission in der EBU heutzutage und viele andere Themen, die uns in der Jugend beschäftigen nach außen bringen, sodass alle Gemeindemitglieder, egal welchen Alters, in der Lage sind, sich auch mit diesen Themen auseinander zu setzen.",
  manifest: "/manifest.json",
  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "https://lammgeplauder.de/api/feed",
          title: "Podcast Feed: Lammgeplauder Podcast",
        },
      ],
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  return (
    <html lang="de">
      <body className={inter.className}>
        <ToastContainer />
        {children}
        <Footer session={session} />
      </body>
    </html>
  );
}
