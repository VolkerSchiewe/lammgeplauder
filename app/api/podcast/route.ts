import { firestore } from "firebase-admin";
import getPodcast from "../../../libs/db/podcast";
import { validateData } from "../../../libs/db/validation";
import { initFirebaseAdmin } from "../../../libs/firebase/firebaseAdmin";
initFirebaseAdmin()

export async function GET(): Promise<Response>{
    console.info("get podcast")
    const podcast = await getPodcast()
    return Response.json(podcast)
}

export async function POST(request:Request) {
    console.info("set podcast")
    const data = await request.json()
    const errors = validateData(data)
    if (errors.length > 0) {
      return Response.json(errors, {status: 400})
    }
    const oldData = await getPodcast()
    const updatedData = { ...oldData, ...data }
    await firestore().collection("podcast").doc(process.env.FIREBASE_PODCAST_DOCUMENT as string).set(updatedData)
    return new Response()
}
