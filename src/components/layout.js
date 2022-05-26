import * as React from "react"
import Link from "gatsby"
import Header from "../components/header"
import Bio from "../components/bio"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div data-is-root-path={isRootPath}>
      <Header title={title} />
      <main>
        <div className="md:flex md:flex-row">
          {!isRootPath && (
            <div className="md:order-last md:basis-3/4">{children}</div>
          )}
          <div className="border-r md:basis-1/4">
            <Bio />
          </div>
          {isRootPath && <div className="md:basis-3/4">{children}</div>}
        </div>
      </main>
      <footer className="border-t text-center text-sm">
        © {new Date().getFullYear()}, NISHIMURA Naoto All Rights Reserved.
        <span className="mx-5 text-xs underline">
          <Link to="/privacy">Privacy Policy</Link>
        </span>
      </footer>
    </div>
  )
}

export default Layout
