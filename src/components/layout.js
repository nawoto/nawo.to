import * as React from "react"
import Header from "../components/header"
import Bio from "../components/bio"
import Footer from "../components/footer"

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
      <Footer />
    </div>
  )
}

export default Layout
