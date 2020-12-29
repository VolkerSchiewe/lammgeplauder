import firebase from "firebase";
import initFirebase from "../auth/initFirebase";

initFirebase()

export default function uploadFile(file: File): Promise<string> {
  return new Promise(async resolve => {
    const fileBuffer = await file.arrayBuffer()
    const bucket = firebase.storage().ref()
    bucket.child(file.name).put(fileBuffer, { contentType: file.type })
      .then(snapshot => snapshot.ref.getDownloadURL()).then(url => resolve(url))
  })
}
