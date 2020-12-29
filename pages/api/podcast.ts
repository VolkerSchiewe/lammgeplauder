import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import { validateData } from "../../utils/db/validation";
import getPodcast from "../../utils/db/podcast";
import { initFirebaseAdmin } from "../../utils/auth/firebaseAdmin";
import protectedApi from "../../utils/auth/protectedApi";

const setPodcast = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("set podcast")
  initFirebaseAdmin()
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
  res.status(200).end()
}

export default protectedApi(setPodcast)
