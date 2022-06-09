import * as React from "react"

const WebMentions = ({ edges }) => {
  const likes = edges.filter(({ node }) => node.wmProperty === "like-of")
  const likeAuthors = likes.map(
    ({ node }) =>
      node.author && {
        wmId: node.wmId,
        wmSource: node.wmSource,
        ...node.author,
      }
  )

  return (
    <div>
      <h3 className="border-b text-center">Webmentions</h3>

      <div>
        {likes.length === 0 ? (
          <span className="text-gray-500">No Webmention</span>
        ) : null}

        {likeAuthors.map(author => (
          <div className="py-1 text-lg md:flex" key={author.wmId}>
            <p className="flex">
              <a href={author.url} target="_blank" rel="noopener noreferrer">
                <img
                  alt={author.name}
                  src={author.photo}
                  loading="lazy"
                  className="z-index overflow-hidden rounded-lg"
                  width={30}
                  height={30}
                />
              </a>

              <span className="px-1 underline decoration-gray-400">
                <a href={author.url} target="_blank" rel="noopener noreferrer">
                  {author.name}
                </a>
              </span>
            </p>
            <p>
              <a
                href={author.wmSource}
                className="underline decoration-gray-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                liked this
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WebMentions
