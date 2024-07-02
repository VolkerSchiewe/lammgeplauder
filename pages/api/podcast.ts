import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import { validateData } from "../../libs/db/validation";
import getPodcast from "../../libs/db/podcast";
import { initFirebaseAdmin } from "../../libs/firebase/firebaseAdmin";

const setPodcast = async (req: NextApiRequest, res: NextApiResponse) => {
  initFirebaseAdmin()
  if (req.method === "POST") {
    console.info("set podcast")
    const data = JSON.parse(req.body)
    const errors = validateData(data)
    if (errors.length > 0) {
      res.status(400).json(errors)
      return
    }
    const oldData = await getPodcast()
    const updatedData = { ...oldData, ...data }
    await firestore().collection("podcast").doc(process.env.FIREBASE_PODCAST_DOCUMENT as string).set(updatedData)
    res.status(200).end()
    return
  } else if (req.method === "GET") {
    console.info("get podcast")
    const podcast = await getPodcast()
    res.json(podcast)
    res.end()
    return
  } else {
    res.status(405).end()
    return
  }
}

export default setPodcast
