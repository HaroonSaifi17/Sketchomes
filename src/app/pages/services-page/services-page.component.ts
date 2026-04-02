import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.css',
})
export class ServicesPageComponent {
  constructor(private readonly seoService: SeoService) {
    this.seoService.update({
      title: 'Interior Design Services in Gurgaon & Delhi NCR',
      description:
        'Explore Sketchomes interior design services including residential, commercial, retail, and hospitality turnkey interior execution.',
      path: '/services',
      image: '/assets/images/hero2.webp',
    });
  }

  readonly services = [
    {
      title: 'Residential Interiors',
      image: '/assets/images/residential-s.webp',
      copy: 'Complete home transformations with custom layouts, finishes, and furniture styling.',
    },
    {
      title: 'Commercial Interiors',
      image: '/assets/images/commercial-s.webp',
      copy: 'Workspaces engineered for flow, collaboration, and a refined brand identity.',
    },
    {
      title: 'Retail & Hospitality',
      image: '/assets/images/retail-s.webp',
      copy: 'Atmospheric guest-facing spaces that drive engagement and memorable experiences.',
    },
    {
      title: 'Design Consultation',
      image: '/assets/images/info.webp',
      copy: 'Material, lighting, and planning consultations to kickstart your project with confidence.',
    },
  ];

  readonly process = [
    'Discovery + site study',
    'Concept development',
    '3D visualization + approvals',
    'Execution + quality checks',
    'Styling + handover',
  ];
}
