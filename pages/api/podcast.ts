import { NextApiRequest, NextApiResponse } from "next";
import initFirebase from "../../utils/db/firebase-admin";
import { getSession } from "next-auth/client";
import { firestore } from "firebase-admin";
import { validateData } from "../../utils/db/validation";
import getPodcast from "../../utils/db/podcast";


const setPodcast = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("set podcast", req.body)
  const session = await getSession({ req })
  if (!session) {
    res.status(401).send("Unauthorized")
    return
  }
  initFirebase()
  const data = JSON.parse(req.body)
  const errors = validateData(data)
  // TODO validate image and upload to storage
  if (errors.length > 0) {
    res.status(400).json(errors)
    return
  }
  const oldData = await getPodcast()
  const updatedData = { ...oldData, ...data }
  await firestore().collection("podcast").doc(process.env.FIREBASE_PODCAST_DOCUMENT as string).set(updatedData)
  res.status(200).send("")
}

export default setPodcast
