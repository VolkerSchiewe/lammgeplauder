import React, { CSSProperties, ReactNode } from 'react'

type Props = {
  children?: ReactNode
  title?: string
  className?: string
  style?: CSSProperties
}

const Layout = ({ children, className, style }: Props) => (
  <div>
    <div className={ className } style={ style }>
      { children }
    </div>
  </div>
)

export default Layout
