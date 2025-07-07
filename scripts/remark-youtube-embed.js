import { visit } from 'unist-util-visit';

/**
 * Remark plugin to convert YouTube URLs to embedded iframes
 * Supports various YouTube URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function remarkYoutubeEmbed() {
  return function (tree) {
    // Process paragraph nodes (text URLs)
    visit(tree, 'paragraph', (node) => {
      if (node.children && node.children.length === 1) {
        const child = node.children[0];

        // Check if it's a text node with YouTube URL
        if (child.type === 'text') {
          const youtubeMatch = extractYoutubeVideoId(child.value);
          if (youtubeMatch) {
            const videoId = youtubeMatch;

            // Replace the paragraph with HTML
            node.type = 'html';
            node.value = createYoutubeEmbed(videoId);
            delete node.children;
          }
        }
      }
    });

    // Process link nodes (clickable URLs)
    visit(tree, 'link', (node) => {
      if (node.url) {
        const youtubeMatch = extractYoutubeVideoId(node.url);
        if (youtubeMatch) {
          const videoId = youtubeMatch;

          // Replace the link with HTML
          node.type = 'html';
          node.value = createYoutubeEmbed(videoId);
          delete node.url;
          delete node.children;
        }
      }
    });
  };
}

function extractYoutubeVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

function createYoutubeEmbed(videoId) {
  return `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 2rem 0;">
  <iframe 
    src="https://www.youtube.com/embed/${videoId}" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
  </iframe>
</div>`;
}
