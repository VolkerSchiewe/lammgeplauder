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
      <Layout className={ `min-h-screen flex flex-col items-center` } style={ style }>
        <Navbar logout={ logout }/>
        <div className={ `${ className } w-full md:w-1/2` }>
          { children }
        </div>
      </Layout>
    ) : (
      <div>{ "Unauthorized" }</div>
    )
  )
}

export default React.memo(LayoutAdmin)
