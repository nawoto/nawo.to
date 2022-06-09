import React from "react"
import Giscus from "@giscus/react"

const Comments = () => {
  return (
    <Giscus
      id="comments"
      repo="nawoto/nawo.to"
      repoId="R_kgDOHLJkHA"
      category="Announcements"
      categoryId="DIC_kwDOHLJkHM4CPjYl"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  )
}

export default Comments
