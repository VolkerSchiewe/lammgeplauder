import { NextPage } from "next";
import { signOut, useSession } from "next-auth/client";
import React from "react";
import { useRouter } from "next/router";

const AdminPage: NextPage = () => {
  const [session, loading] = useSession()
  const router = useRouter()
  if (!loading && !session) {
    router.push(`/api/auth/signin`)
    return null
  }
  return <>
    { session && <>
        Signed in as { session.user.email } <br/>
        <button onClick={ () => signOut() }>Sign out</button>
    </> }
  </>
}

export default AdminPage
