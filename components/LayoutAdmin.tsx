import React, { CSSProperties, ReactNode } from 'react'
import Navbar from "./Navbar";
import Layout from "./Layout";
import { useUser } from "../utils/auth/useUser";

type Props = {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

const LayoutAdmin = ({ children, className = "", style }: Props) => {
  const { user, logout } = useUser()
  return (
    user ? (
      <Layout className={ `${ className } min-h-screen` } style={ style }>
        <Navbar logout={ logout }/>
        { children }
      </Layout>
    ) : null
  )
}

export default LayoutAdmin
