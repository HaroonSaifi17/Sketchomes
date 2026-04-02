import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
})
export class ProjectsPageComponent {
  constructor(private readonly seoService: SeoService) {
    this.seoService.update({
      title: 'Interior Design Portfolio Projects',
      description:
        'Browse Sketchomes portfolio of luxury interior design projects across residential, commercial, retail, and hospitality segments.',
      path: '/projects',
      image: '/assets/images/hero3.webp',
    });
  }

  readonly projects = [
    {
      title: 'Modern Office Suite',
      type: 'Commercial',
      image: '/assets/images/commercial-s.webp',
    },
    {
      title: 'Bespoke Family Residence',
      type: 'Residential',
      image: '/assets/images/residential-s.webp',
    },
    {
      title: 'High-street Retail Gallery',
      type: 'Retail',
      image: '/assets/images/retail-s.webp',
    },
    {
      title: 'Luxury Hospitality Lounge',
      type: 'Hospitality',
      image: '/assets/images/hospitality-s.webp',
    },
  ];
}
