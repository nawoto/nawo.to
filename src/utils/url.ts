import { getLogSlug, getTextSlug } from './slug';
import type { CollectionType } from './collections';

// logs用URL生成
export function getLogUrl(id: string): string {
  return `/${getLogSlug(id)}/`;
}

// texts用URL生成
export function getTextUrl(id: string): string {
  return `/texts/${getTextSlug(id)}/`;
}

// backtrace用URL生成
export function getBacktraceUrl(id: string): string {
  return `/backtrace/${getLogSlug(id)}/`;
}

// コレクション + ID からURL生成
export function getArticleUrl(collection: CollectionType, id: string): string {
  if (collection === 'backtrace') return getBacktraceUrl(id);
  if (collection === 'texts') return getTextUrl(id);
  return getLogUrl(id);
}
