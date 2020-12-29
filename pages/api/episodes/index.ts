import { NextApiRequest, NextApiResponse } from "next";
import getEpisodes from "../../../utils/db/episodes";
import { initFirebaseAdmin } from "../../../utils/auth/firebaseAdmin";
import protectedApi from "../../../utils/auth/protectedApi";

const episodes = async (req: NextApiRequest, res: NextApiResponse) => {
  initFirebaseAdmin()
  if (req.method === "POST") {
    console.log("new episode", req.body)
    // const data = JSON.parse(req.body)
    // await firestore().collection(process.env.FIREBASE_PODCAST_DOCUMENT as string).add(data)
    res.end()
  } else if (req.method === "GET") {
    console.log("get all episodes")
    const episodes = await getEpisodes()
    res.send(episodes)
  }
}

export default protectedApi(episodes)
