import { Podcast } from "../../types/models";
import { firestore } from "firebase-admin";
import { initFirebaseAdmin } from "../firebase/firebaseAdmin";

export default async function getPodcast(): Promise<Podcast> {
  initFirebaseAdmin()
  const db = firestore()
  const podcastDocument = await db.collection("podcast").doc(process.env.FIREBASE_PODCAST_DOCUMENT as string).get()
  return podcastDocument.data() as Podcast
}
