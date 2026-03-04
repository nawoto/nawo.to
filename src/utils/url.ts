import { getLogSlug, getTextSlug } from './slug';

// logs用URL生成
export function getLogUrl(slug: string): string {
  return `/${getLogSlug(slug)}/`;
}

// texts用URL生成
export function getTextUrl(slug: string): string {
  return `/texts/${getTextSlug(slug)}/`;
}

// backtrace用URL生成
export function getBacktraceUrl(slug: string): string {
  // slugは "2012/03/26/1332726969" のような形式で渡る前提
  return `/backtrace/${slug}/`;
}
