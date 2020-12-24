import NextAuth, { InitOptions } from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest, NextApiResponse } from "next";

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)
