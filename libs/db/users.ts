import { initFirebaseAdmin } from "../firebase/firebaseAdmin"
import { firestore } from "firebase-admin";

export default function getUsers(): Promise<Array<string>> {
    initFirebaseAdmin()
    const db = firestore()
    return new Promise<Array<string>>(async resolve => {
      const usersCollection = await db.collection("users").get()
      const users: Array<string> = []
      usersCollection.forEach((doc) => {
        users.push(doc.id)
      })
      resolve(users)
    })
  }
