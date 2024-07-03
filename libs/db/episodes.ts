import { Episode } from "../../types/models";
import { firestore } from "firebase-admin";
import { initFirebaseAdmin } from "../firebase/firebaseAdmin";

export default function getEpisodes(): Promise<Array<Episode>> {
  initFirebaseAdmin()
  const db = firestore()
  return new Promise<Array<Episode>>(async resolve => {
    const episodesCollection = await db.collection(process.env.FIREBASE_PODCAST_DOCUMENT as string).orderBy('publishingDate').get()
    const episodes: Array<Episode> = []
    episodesCollection.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id
      episodes.push(data as Episode)
    })
    resolve(episodes)
  })
}
