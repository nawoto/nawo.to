// Amazon商品カードの情報を動的に取得
document.addEventListener('DOMContentLoaded', () => {
  const amazonCards = document.querySelectorAll('.amazon-card');

  // 画像URLが有効かどうかをチェックする関数
  function isValidImageUrl(url) {
    if (!url) return false;
    
    // AmazonのトラッキングURLや無効なURLを除外
    const invalidPatterns = [
      /fls-fe\.amazon\.co\.jp\/.*requestId=/,
      /oc-csi/,
      /amazon\.co\.jp\/.*requestId=/,
      /^https?:\/\/[^\/]*amazon\.co\.jp\/1\/oc-csi\//,
      /^https?:\/\/[^\/]*amazon\.co\.jp\/1\/OP\//
    ];
    
    return !invalidPatterns.some(pattern => pattern.test(url));
  }

  amazonCards.forEach((card, _index) => {
    const productUrl = card.dataset.url;
    if (!productUrl) return;

    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(productUrl)}`;

    fetch(apiUrl, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.data) {
          const { title, description, image, url } = data.data;
          
          // 画像URLの検証
          const imageUrl = image && image.url && isValidImageUrl(image.url) ? image.url : null;
          
          // カードのHTMLを生成
          const cardHtml = `
            <a href="${url}" class="remark-link-card-plus__card" target="_blank" rel="noopener">
              ${imageUrl ? `<img src="${imageUrl}" class="remark-link-card-plus__image" alt="商品画像">` : ''}
              <div class="remark-link-card-plus__content">
                <h3 class="remark-link-card-plus__title">${title || '商品情報を取得中...'}</h3>
                ${description ? `<p class="remark-link-card-plus__description">${description}</p>` : ''}
                <div class="remark-link-card-plus__meta">
                  <span class="remark-link-card-plus__domain">amazon.co.jp</span>
                </div>
              </div>
            </a>
          `;
          
          // カードを差し替え
          card.innerHTML = cardHtml;
        } else {
          card.innerHTML = '<p>商品情報の取得に失敗しました。</p>';
        }
      })
      .catch(error => {
        console.error('Amazonカードの取得エラー:', error);
        card.innerHTML = '<p>商品情報の取得に失敗しました。</p>';
      });
  });
}); 