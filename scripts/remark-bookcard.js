import { visit } from 'unist-util-visit';
import { books } from '../src/data/books.js';
import { getBookByIdentifier } from '../src/data/books.js';
import { SITE } from '../src/config.js';

export default function remarkBookCard() {
  return function (tree) {
    visit(tree, 'paragraph', (node) => {
      if (node.children && node.children.length === 1 && node.children[0].type === 'text') {
        const textNode = node.children[0];
        const text = textNode.value;
        const bookMatch = text.match(/\[book:(.+?)\]/);

        if (bookMatch) {
          const identifier = bookMatch[1];
          const book = getBookByIdentifier(identifier);

          if (book) {
            // BookCardのHTMLを生成
            const bookCardHtml = generateBookCardHtml(book);

            // 段落ノードをHTMLノードに置換
            node.type = 'html';
            node.value = bookCardHtml;
            delete node.children;
          }
        }
      }
    });
  };
}

function generateBookCardHtml(book) {
  const amazonUrl = `https://www.amazon.co.jp/dp/${book.asin}?tag=${SITE.affiliate.amazon}`;

  // 著者名のフォーマット（西村直人だけ太字）
  const formatAuthorName = (author) => {
    return author.replace(/西村\s*直人/g, '<strong>西村 直人</strong>');
  };

  // 画像のsrcsetを生成（ローカル画像の場合）
  let imageSrcset = '';
  const imageSrc = book.coverImage;

  if (book.coverImage.startsWith('/')) {
    // ローカル画像の場合、WebP版も用意
    const webpPath = book.coverImage.replace(/\.(png|jpg|jpeg)$/, '.webp');
    imageSrcset = `<source srcset="${webpPath}" type="image/webp" />`;
  }

  return `<div class="book-card group">
  <div class="book-cover">
    <picture>
      ${imageSrcset}
      <img src="${imageSrc}" alt="${book.title} の表紙" />
    </picture>
  </div>
  <div class="book-content">
    <h3 class="book-title">📚 ${book.title}</h3>
    <p class="book-author">${formatAuthorName(book.author)}</p>
    <p class="book-description">${book.description}</p>
    <a href="${amazonUrl}" class="amazon-link transition-colors duration-200 group-hover:bg-green-500 group-hover:text-white" target="_blank" rel="noopener noreferrer">
      📖 Amazonで見る
    </a>
  </div>
</div>`;
}
