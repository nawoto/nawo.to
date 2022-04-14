import * as React from "react"
import Header from "../components/header"
import Bio from "../components/bio"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="" data-is-root-path={isRootPath}>
      <Header title={title} />
      <main>
        <div className="md:flex md:flex-row">
          <div className="md:basis-3/4 md:order-last">{children}</div>
          <div className="md:basis-1/4 border-r"><Bio /></div>
        </div>
      </main>
      <footer>
        © {new Date().getFullYear()}, NISHIMURA Naoto All Rights Reserved.
      </footer>
    </div>
  )
}

export default Layout
