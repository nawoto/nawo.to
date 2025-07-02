import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { SITE } from '../config.js';

// 絵文字除去用関数
function removeEmoji(str: string): string {
  return str.replace(/[\p{Emoji_Presentation}\u200d]+/gu, '').replace(/[\uFE0F\uFE0E]/g, '');
}

interface GenerateOgImageParams {
  title: string;
  fontData: Buffer;
  iconBase64: string;
}

const generateOgImage = async ({ title, fontData, iconBase64 }: GenerateOgImageParams): Promise<Buffer> => {
    const sanitizedTitle = removeEmoji(title);

    const svg = await satori(
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#fff', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          <img src={`data:image/png;base64,${iconBase64}`} width={120} height={120} style={{ borderRadius: '50%' }} />
        </div>
        <div
          style={{ fontSize: 60, fontWeight: SITE.ogp.fontWeight, fontFamily: SITE.ogp.fontName, textAlign: 'center', maxWidth: 1000, lineHeight: 1.2 }}
        >
          {sanitizedTitle}
        </div>
      </div>,
      {
        width: SITE.ogp.width,
        height: SITE.ogp.height,
        fonts: [
          {
            name: SITE.ogp.fontName,
            data: fontData,
            style: 'normal' as const,
            weight: SITE.ogp.fontWeight,
          },
        ],
      }
    );

    return sharp(Buffer.from(svg)).png().toBuffer();
};



export const ogImageGenerator = (): AstroIntegration => {
  return {
    name: 'og-image-generator',
    hooks: {
      'astro:build:done': async ({ routes, logger }) => {
        logger.info('🖼️  Generating OG images after build...');
        
        // フォントとアイコンを一度だけ読み込み（ループ外で最適化）
        const fontPath = path.resolve(process.cwd(), SITE.ogp.fontPath);
        const fontData = fs.readFileSync(fontPath);
        
        const iconPath = path.resolve(process.cwd(), SITE.ogp.iconPath);
        const iconBase64 = fs.readFileSync(iconPath).toString('base64');
        
        const defaultOgImagePath = path.resolve(process.cwd(), SITE.ogp.defaultOgImagePath);
        
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
              
              const buffer = await generateOgImage({ title, fontData, iconBase64 });
              fs.writeFileSync(outputOgPath, buffer);
              logger.info(`✅ Generated: ${path.relative(process.cwd(), outputOgPath)}`);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                logger.warn(`⚠️ Failed to generate OG for ${path.relative(process.cwd(), indexHtmlPath)}: ${errorMessage}. Using default.`);
                fs.copyFileSync(defaultOgImagePath, outputOgPath);
            }
          })
        );
      },
    },
  };
}; 