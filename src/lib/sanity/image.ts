import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImage } from '@/types';
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;
export function imageUrl(source?: SanityImage, width = 1200, height?: number) {
  if (!builder || !source?.asset) return undefined;
  let img = builder.image(source).auto('format').fit('crop').width(width);
  if (height) img = img.height(height);
  return img.url();
}
