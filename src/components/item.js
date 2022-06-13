import * as React from "react"
import { Link } from "gatsby"

const ArticletItem = ({ key, article }) => {
  const title = article.frontmatter.title || article.fields.slug

  return (
    <li className="hover-style border-y border-solid py-2">
      <article
        className="mx-auto w-5/6"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="py-4">
          <h2 className="text-2xl font-bold">
            <Link to={article.fields.slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>
          <small>{article.frontmatter.date}</small>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: article.frontmatter.description || article.excerpt,
            }}
            itemProp="description"
          />
          <div className="my-2 py-2 text-center text-xl uppercase md:text-left">
            <Link to={article.fields.slug} className="underline">
              read more
            </Link>
          </div>
        </section>
      </article>
    </li>
  )
}

export default ArticletItem
