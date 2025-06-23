import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const siteUrl = 'https://nawo.to';
const authorName = '#nawoto';

// 絵文字除去用関数
function removeEmoji(str) {
  return str.replace(/[\p{Emoji_Presentation}\u200d]+/gu, '').replace(/[\uFE0F\uFE0E]/g, '');
}

const generateOgImage = async (title, iconBase64) => {
    // Noto Sans JPフォントのみ読み込み
    const fontPath = path.resolve(process.cwd(), 'public/fonts/NotoSansJP-Bold.ttf');
    const fontData = fs.readFileSync(fontPath);

    const sanitizedTitle = removeEmoji(title);

    const svg = await satori(
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#fff', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          <img src={`data:image/png;base64,${iconBase64}`} width={120} height={120} style={{ borderRadius: '50%' }} />
        </div>
        <div
          style={{ fontSize: 60, fontWeight: 700, fontFamily: 'Noto Sans JP', textAlign: 'center', maxWidth: 1000, lineHeight: 1.2 }}
        >
          {sanitizedTitle}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Noto Sans JP',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );

    return sharp(Buffer.from(svg)).png().toBuffer();
};

export const ogImageGenerator = (options) => {
  return {
    name: 'og-image-generator',
    hooks: {
      'astro:build:done': async ({ routes, logger }) => {
        logger.info('🖼️  Generating OG images after build...');
        
        const siteIconPath = path.resolve(process.cwd(), 'public/images/site-icon.png');
        const iconBase64 = fs.readFileSync(siteIconPath).toString('base64');
        const defaultOgImagePath = path.resolve(process.cwd(), 'public/images/opengraph-default.png');
        
        // 対象となるルートコンポーネント
        const targetComponents = [
          'src/pages/[...slug].astro',
          'src/pages/texts/[...slug].astro'
        ];

        // 全ての生成ページをフラットなリストにする
        const allPages = routes
          .filter(route => targetComponents.some(c => route.component === c))
          .flatMap(route => 
            route.distURL ? route.distURL.map(url => ({ component: route.component, distURL: url })) : []
          );

        await Promise.all(
          allPages.map(async (page) => {
            const indexHtmlPath = fileURLToPath(page.distURL);
            const pageDir = path.dirname(indexHtmlPath);
            const outputOgPath = path.join(pageDir, 'og.png');

            try {
              if (!fs.existsSync(indexHtmlPath)) {
                  throw new Error(`Could not find index.html at ${indexHtmlPath}`);
              }

              const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
              const titleMatch = indexHtml.match(/<title[^>]*>([^<]+)<\/title>/);
              
              if (!titleMatch || !titleMatch[1]) {
                  throw new Error(`Could not find title for page: ${page.component}`);
              }
              const title = titleMatch[1];
              
              const buffer = await generateOgImage(title, iconBase64);
              fs.writeFileSync(outputOgPath, buffer);
              logger.info(`✅ Generated: ${path.relative(process.cwd(), outputOgPath)}`);
            } catch (error) {
                logger.warn(`⚠️ Failed to generate OG for ${path.relative(process.cwd(), indexHtmlPath)}: ${error.message}. Using default.`);
                fs.copyFileSync(defaultOgImagePath, outputOgPath);
            }
          })
        );
      },
    },
  };
}; 