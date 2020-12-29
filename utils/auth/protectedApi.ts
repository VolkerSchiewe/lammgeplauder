import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "universal-cookie";

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => void
const protectedApi = (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
  const user = new Cookies(req.headers.cookie).get("auth")
  if (!user) {
    console.log("Unauthorized", req.url)
    res.status(401).end()
    return
  } else {
    handler(req, res)
  }
}

export default protectedApi
