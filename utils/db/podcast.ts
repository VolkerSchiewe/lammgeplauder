import { Podcast } from "../../types/models";
import initFirebase from "./firebase-admin";
import { firestore } from "firebase-admin";

export default async function getPodcast(): Promise<Podcast> {
  initFirebase()
  const db = firestore()
  const podcastDocument = await db.collection("podcast").doc("Lammgeplauder").get()
  return podcastDocument.data() as Podcast
}
