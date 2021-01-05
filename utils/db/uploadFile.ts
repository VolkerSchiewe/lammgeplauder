import firebase from "firebase/app";
import "firebase/storage"
import initFirebase from "../auth/initFirebase";

initFirebase()

export default function uploadFile(file: File, progressHandler?: (progress: number) => void): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const fileBuffer = await file.arrayBuffer()
    const bucket = firebase.storage().ref()
    const uploadTask = bucket.child(file.name)
      .put(fileBuffer, { contentType: file.type })
    uploadTask.on("state_changed", snapshot => {
        if (progressHandler) {
          progressHandler((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        }
      },
      error => reject(error),
      () => {
        uploadTask.snapshot.ref.getDownloadURL()
          .then(url => resolve(url))
      })
  })
}
