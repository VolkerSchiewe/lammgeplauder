import { NextApiRequest, NextApiResponse } from "next";
import initFirebase from "../../utils/db/firebase-admin";
import { getSession } from "next-auth/client";

const setPodcast = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session) {
    res.status(401)
    res.end()
    return
  }
  initFirebase()
  const data = JSON.parse(req.body)
  console.log(data)
  res.end()
}

export default setPodcast
