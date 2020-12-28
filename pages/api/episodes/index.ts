import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { firestore } from "firebase-admin";
import initFirebase from "../../../utils/db/firebase-admin";
import getEpisodes from "../../../utils/db/episodes";

const episodes = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session) {
    res.status(401)
    res.end()
    return
  }
  initFirebase()
  if (req.method === "POST") {
    console.log("new episode", req.query)
    const data = JSON.parse(req.body)
    await firestore().collection(process.env.FIREBASE_PODCAST_DOCUMENT as string).add(data)
    res.end()
  } else if (req.method === "GET") {
    console.log("get episodes", req.query)
    const episodes = await getEpisodes()
    res.send(episodes)
  }
}

export default episodes
