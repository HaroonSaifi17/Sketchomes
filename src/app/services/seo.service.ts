import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SeoData {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly siteName = 'Sketchomes';
  private readonly defaultImage = '/assets/images/hero1.webp';
  private readonly baseUrl = 'https://sketchomes.in';

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  update(data: SeoData) {
    const fullTitle = data.title.includes(this.siteName)
      ? data.title
      : `${data.title} | ${this.siteName}`;

    const url = `${this.baseUrl}${data.path ?? '/'}`;
    const image = data.image
      ? this.toAbsoluteUrl(data.image)
      : `${this.baseUrl}${this.defaultImage}`;

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({
      name: 'robots',
      content: data.noindex ? 'noindex,nofollow' : 'index,follow',
    });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });

    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.updateCanonical(url);
  }

  private updateCanonical(url: string) {
    let link = this.document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  private toAbsoluteUrl(path: string) {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    return `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }
}
