import React, { CSSProperties, ReactNode } from 'react'
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Layout from "./Layout";

type Props = {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

const LayoutAdmin = ({ children, className = "", style }: Props) => {
  const [session, loading] = useSession()
  const router = useRouter()
  if (!loading && !session) {
    router.push(`/api/auth/signin`)
    return null
  }
  return (
    session ? (
      <Layout className={ `${ className } min-h-screen` } style={ style }>
        <Navbar/>
        { children }
      </Layout>
    ) : null
  )
}

export default LayoutAdmin
