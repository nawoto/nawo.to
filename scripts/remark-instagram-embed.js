import { visit } from 'unist-util-visit';

/**
 * Remark plugin to convert Instagram URLs to embedded iframes
 * Supports various Instagram URL formats:
 * - https://www.instagram.com/p/POST_ID/
 * - https://instagram.com/p/POST_ID/
 */
export function remarkInstagramEmbed() {
  return function (tree) {
    // Process paragraph nodes (text URLs)
    visit(tree, 'paragraph', (node) => {
      if (node.children && node.children.length === 1) {
        const child = node.children[0];

        // Check if it's a text node with Instagram URL
        if (child.type === 'text') {
          const instagramMatch = extractInstagramPostId(child.value);
          if (instagramMatch) {
            const postId = instagramMatch;

            // Replace the paragraph with HTML
            node.type = 'html';
            node.value = createInstagramEmbed(postId);
            delete node.children;
          }
        }
      }
    });

    // Process link nodes (clickable URLs)
    visit(tree, 'link', (node) => {
      if (node.url) {
        const instagramMatch = extractInstagramPostId(node.url);
        if (instagramMatch) {
          const postId = instagramMatch;

          // Replace the link with HTML
          node.type = 'html';
          node.value = createInstagramEmbed(postId);
          delete node.url;
          delete node.children;
        }
      }
    });
  };
}

function extractInstagramPostId(url) {
  const patterns = [/instagram\.com\/p\/([a-zA-Z0-9_-]+)/, /instagram\.com\/p\/([a-zA-Z0-9_-]+)\//];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

function createInstagramEmbed(postId) {
  return `<div style="margin: 2rem 0;">
  <iframe 
    src="https://www.instagram.com/p/${postId}/embed" 
    width="100%" 
    height="700" 
    frameborder="0" 
    scrolling="no" 
    allowtransparency="true">
  </iframe>
</div>`;
}
