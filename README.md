# Sketchomes Website (Angular)

Production website for Sketchomes, an interior design studio focused on residential and commercial spaces.

## Stack

- Angular 21 standalone components
- Angular Router with lazy-loaded routes
- Tailwind CSS 4
- Three.js for interactive 360 viewer

## Quick start

```bash
npm install
npm start
```

Open `http://localhost:4200`.

Build for production:

```bash
npm run build
```

## Project structure

- `src/app/pages/` route pages (`home`, `about`, `services`, `projects`, `contact`, `inquiry`, `not-found`)
- `src/app/components/` reusable sections (`navbar`, `hero`, `about`, `photo-sphere`, `info`, `project-type`, `footer`)
- `src/app/services/seo.service.ts` runtime SEO/meta updater
- `src/assets/images/` optimized image assets (WebP)
- `public/robots.txt` and `public/sitemap.xml` for crawler guidance

## SEO improvements implemented

- Strong base metadata in `src/index.html`:
  - title, description, keywords, robots, canonical
  - Open Graph and Twitter card tags
  - `LocalBusiness` JSON-LD structured data
- Per-page dynamic SEO via `SeoService`:
  - unique page title/description/canonical
  - OG + Twitter tags updated on route change
  - `noindex` set for not-found page
- Crawl files:
  - `robots.txt` points to sitemap
  - `sitemap.xml` includes all public routes

## Image optimization work

- Converted all remaining JPG UI assets to WebP:
  - `bbg`, `commercial-s`, `hospitality-s`, `render`, `residential-s`, `retail-s`, `seo-bg`
- Updated all app references from `.jpg` to `.webp`
- Removed replaced JPG files from `src/assets/images/`
- Added explicit width/height on major images to reduce CLS risk

## 360 viewer notes

- Panorama rendering is tuned for smoother/softer output:
  - processed texture via canvas filter (brightness/contrast/saturation tuning)
  - mipmap filtering and capped anisotropy
  - viewport + DPR handling for stability
- Uses `src/assets/images/render.webp` as source panorama.

## Performance notes

- Routes are lazy-loaded via `loadComponent` in `src/app/app.routes.ts`
- Home page defers heavy sections (`@defer`) for faster initial paint
- Scroll restoration enabled in router config

## Scripts

- `npm start` - dev server
- `npm run build` - production build
- `npm run test` - unit tests

## Deployment checklist

- Replace `https://sketchomes.in` if deploying to another domain:
  - `src/index.html` canonical + OG + Twitter + JSON-LD URLs
  - `public/sitemap.xml`
  - `public/robots.txt`
