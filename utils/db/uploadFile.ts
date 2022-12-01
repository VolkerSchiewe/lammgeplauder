import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import initFirebase from "../auth/initFirebase";

initFirebase();

export default function uploadFile(
  file: File,
  progressHandler?: (progress: number) => void
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const fileBuffer = await file.arrayBuffer();
    const bucket = ref(getStorage());
    const uploadTask = uploadBytesResumable(ref(bucket, file.name), fileBuffer, {contentType: file.type,})
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (progressHandler) {
          progressHandler(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        }
      },
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => resolve(url));
      }
    );
  });
}
