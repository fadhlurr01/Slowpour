/**
 * Returns the correct image URL by prepending Vite's BASE_URL.
 * This ensures images work on both local dev and GitHub Pages.
 *
 * Usage: imgUrl('/images/coffee-beans.jpg')
 * Local: /images/coffee-beans.jpg
 * GitHub Pages: /Project-5/images/coffee-beans.jpg
 */
export function imgUrl(path) {
  // import.meta.env.BASE_URL is '/' in dev, '/Project-5/' in production build
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
