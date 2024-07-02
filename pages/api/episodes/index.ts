import { NextApiRequest, NextApiResponse } from "next";
import getEpisodes from "../../../libs/db/episodes";
import { initFirebaseAdmin } from "../../../libs/firebase/firebaseAdmin";
import { firestore } from "firebase-admin";

const episodes = async (req: NextApiRequest, res: NextApiResponse) => {
  initFirebaseAdmin()
  if (req.method === "POST") {
    console.info("new episode", req.body)
    const data = JSON.parse(req.body)
    await firestore().collection(process.env.FIREBASE_PODCAST_DOCUMENT as string).add(data)
    res.send("Saved")
    res.end()
    return
  } else if (req.method === "GET") {
    console.info("get all episodes")
    const episodes = await getEpisodes()
    res.send(episodes)
    return
  } else {
    res.status(405).end()
  }
}

export default episodes
