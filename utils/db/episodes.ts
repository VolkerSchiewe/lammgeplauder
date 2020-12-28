import { Episode } from "../../types/models";
import initFirebase from "./firebase-admin";
import { firestore } from "firebase-admin";

export default function getEpisodes(): Promise<Array<Episode>> {
  initFirebase()
  const db = firestore()
  return new Promise<Array<Episode>>(async resolve => {
    const episodesCollection = await db.collection(process.env.FIREBASE_PODCAST_DOCUMENT as string).get()
    const episodes: Array<Episode> = []
    episodesCollection.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id
      episodes.push(data as Episode)
    })
    resolve(episodes)
  })
}
