export function getTextSlug(slug: string): string {
  return slug
    .replace(/\.md$/, '')
    .replace(/^\d{4}\//, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

export function getLogSlug(slug: string): string {
  const fileName = slug.replace(/\.md$/, '').replace(/^\d{4}\//, '');
  const dateMatch = fileName.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);

  if (dateMatch) {
    const [, year, month, day, postSlug] = dateMatch;
    return `${year}/${month}/${day}/${postSlug}`;
  } else {
    return fileName;
  }
}
