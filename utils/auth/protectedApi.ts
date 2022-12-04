import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "universal-cookie";
import { IncomingMessage } from "http";

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => void
const protectedApi = (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
  if (!isValidSession(req)) {
    res.status(401).end()
    return
  } else {
    handler(req, res)
  }
}

export function isValidSession(req: NextApiRequest | IncomingMessage): boolean {
  const user = new Cookies(req.headers.cookie).get("auth")
  if (!["O75uFNTQAGOU5rz7jPISqmcshsF3", "UgnO5DATTSSgMX3p28CSsRl1tYn1"].includes(user?.id)) {
    console.info("Unauthorized", req.url, user)
    return false
  }
  return true
}

export default protectedApi
