import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import { initFirebaseAdmin } from "../../../utils/auth/firebaseAdmin";
import protectedApi from "../../../utils/auth/protectedApi";

const setEpisode = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info("set episode")
  initFirebaseAdmin()
  const { query: { id }, } = req
  if (req.method === "POST") {
    const data = JSON.parse(req.body)
    const oldData = (await firestore().collection(process.env.FIREBASE_PODCAST_DOCUMENT as string).doc(id as string).get()).data()
    const updatedData = { ...oldData, ...data }
    await firestore().collection(process.env.FIREBASE_PODCAST_DOCUMENT as string).doc(id as string).set(updatedData)
    res.end()
  } else {
    res.send("Not implemented")
    res.end()
  }
}

export default protectedApi(setEpisode)
