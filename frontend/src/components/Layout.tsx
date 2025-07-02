import React from "react"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mt-15 min-h-screen text-center">
      <div className="p-1">{children}</div>
    </div>
  )
}

export default Layout
