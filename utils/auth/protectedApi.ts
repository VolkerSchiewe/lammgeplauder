import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "universal-cookie";

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => void
const protectedApi = (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
  const user = new Cookies(req.headers.cookie).get("auth")
  if (!["O75uFNTQAGOU5rz7jPISqmcshsF3", "UgnO5DATTSSgMX3p28CSsRl1tYn1"].includes(user?.id)) {
    console.log("Unauthorized", req.url, user)
    res.status(401).end()
    return
  } else {
    handler(req, res)
  }
}

export default protectedApi
