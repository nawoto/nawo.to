/**
 * texts用のslugを生成する関数
 * 年別ディレクトリと日付プレフィックスを除去してURL用のslugを生成
 */
export function getTextSlug(slug: string): string {
  return slug.replace(/^\d{4}\//, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

/**
 * log用のslugを生成する関数
 * 年別ディレクトリと日付プレフィックスから年/月/日/スラッグ形式のslugを生成
 */
export function getLogSlug(slug: string): string {
  const fileName = slug.replace(/^\d{4}\//, '');
  const dateMatch = fileName.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);

  if (dateMatch) {
    const [, year, month, day, postSlug] = dateMatch;
    return `${year}/${month}/${day}/${postSlug}`;
  } else {
    // 日付プレフィックスがない場合はそのまま使用
    return fileName.toLowerCase();
  }
}
