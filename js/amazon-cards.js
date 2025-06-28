// Amazon商品カードの情報を動的に取得
document.addEventListener('DOMContentLoaded', () => {
  const amazonCards = document.querySelectorAll('.amazon-card');

  amazonCards.forEach(card => {
    const productUrl = card.dataset.url;
    if (!productUrl) return;

    // Use microlink.io API to fetch metadata
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(productUrl)}`;
    
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        if (res.status !== 'success') {
          console.error('Failed to fetch Amazon data from microlink', res);
          const errorHtml = `<p>商品情報の取得に失敗しました: <a href="${productUrl}" target="_blank" rel="noopener noreferrer">${productUrl}</a></p>`;
          const errorCard = document.createElement('div');
          errorCard.className = 'amazon-card-error';
          errorCard.innerHTML = errorHtml;
          card.replaceWith(errorCard);
          return;
        }

        const data = res.data;
        const imageUrl = data.image?.url;
        const title = data.title;
        const description = data.description;
        const siteUrl = data.url;
        // Use publisher if available, otherwise fallback to hostname
        const siteName = data.publisher || new URL(siteUrl).hostname;
        const faviconUrl = data.logo?.url;

        // Re-use the styles from remark-link-card-plus for a consistent look
        const cardHtml = `
          <a href="${productUrl}" class="remark-link-card-plus__card" target="_blank" rel="noopener noreferrer">
            <div class="remark-link-card-plus__main">
              <div class="remark-link-card-plus__title">${title || ''}</div>
              <div class="remark-link-card-plus__description">${description || ''}</div>
              <div class="remark-link-card-plus__meta">
                ${faviconUrl ? `<img src="${faviconUrl}" class="remark-link-card-plus__favicon" width="16" height="16" alt="${siteName} favicon">` : ''}
                <span class="remark-link-card-plus__url">${siteName}</span>
              </div>
            </div>
            ${imageUrl ? `
            <div class="remark-link-card-plus__thumbnail">
              <img src="${imageUrl}" class="remark-link-card-plus__image" alt="商品画像">
            </div>
            ` : ''}
          </a>
        `;
        
        const container = document.createElement('div');
        container.className = 'remark-link-card-plus__container';
        container.innerHTML = cardHtml;

        card.replaceWith(container);
      })
      .catch(err => {
        console.error('Error fetching Amazon product info:', err);
        const errorHtml = `<p>商品情報の取得中にエラーが発生しました: <a href="${productUrl}" target="_blank" rel="noopener noreferrer">${productUrl}</a></p>`;
        const errorCard = document.createElement('div');
        errorCard.className = 'amazon-card-error';
        errorCard.innerHTML = errorHtml;
        card.replaceWith(errorCard);
      });
  });
}); 