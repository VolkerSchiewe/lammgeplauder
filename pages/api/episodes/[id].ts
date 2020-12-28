import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { firestore } from "firebase-admin";
import initFirebase from "../../../utils/db/firebase-admin";

const setPodcast = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("set episode", req.query)
  const session = await getSession({ req })
  if (!session) {
    res.status(401)
    res.end()
    return
  }
  initFirebase()
  const { query: { id }, } = req
  if (req.method === "POST") {
    const data = JSON.parse(req.body)
    const oldData = (await firestore().collection(process.env.FIREBASE_PODCAST_DOCUMENT as string).doc(id as string).get()).data()
    const updatedData = { ...oldData, ...data }
    await firestore().collection(process.env.FIREBASE_PODCAST_DOCUMENT as string).doc(id as string).set(updatedData)
    res.end()
  }
}

export default setPodcast
