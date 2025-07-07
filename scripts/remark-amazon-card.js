import { visit } from 'unist-util-visit';

export function remarkAmazonCard(options = {}) {
  const { affiliateTag = 'nawoto07-22' } = options;

  return function (tree) {
    const amazonUrlPattern = /https:\/\/www\.amazon\.co\.jp\/dp\/([A-Z0-9]{10})(?:\?[^?\s]*)?/g;

    visit(tree, 'paragraph', (node) => {
      if (node.children && node.children.length === 1 && node.children[0].type === 'text') {
        const text = node.children[0].value;
        const matches = [...text.matchAll(amazonUrlPattern)];

        if (matches.length > 0) {
          const asin = matches[0][1];
          const originalUrl = matches[0][0];

          const url = new URL(originalUrl);
          url.searchParams.set('tag', affiliateTag);

          node.type = 'html';
          node.value = `<div class="amazon-card" data-asin="${asin}" data-url="${url.toString()}">
  <div class="amazon-card-placeholder">
    <p>Amazon商品カード (ASIN: ${asin}) - 読み込み中...</p>
  </div>
</div>`;
          delete node.children;
        }
      }
    });

    visit(tree, 'link', (node) => {
      if (node.url && node.url.match(amazonUrlPattern)) {
        const matches = [...node.url.matchAll(amazonUrlPattern)];
        const asin = matches[0][1];
        const originalUrl = node.url;

        const url = new URL(originalUrl);
        url.searchParams.set('tag', affiliateTag);

        node.type = 'html';
        node.value = `<div class="amazon-card" data-asin="${asin}" data-url="${url.toString()}">
  <div class="amazon-card-placeholder">
    <p>Amazon商品カード (ASIN: ${asin}) - 読み込み中...</p>
  </div>
</div>`;
        delete node.url;
        delete node.children;
      }
    });
  };
}
