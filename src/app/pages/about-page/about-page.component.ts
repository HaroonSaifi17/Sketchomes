import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AboutComponent } from '../../components/about/about.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, AboutComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
})
export class AboutPageComponent {
  constructor(private readonly seoService: SeoService) {
    this.seoService.update({
      title: 'About Sketchomes Interior Studio',
      description:
        'Learn about Sketchomes, our design philosophy, and our journey delivering premium interior design projects across Gurgaon, Delhi NCR, and North India.',
      path: '/about',
      image: '/assets/images/hero1.webp',
    });
  }

  readonly values = [
    {
      title: 'Intentional Design',
      copy: 'Every room starts from your routines, not from a preset template.',
    },
    {
      title: 'Material Intelligence',
      copy: 'We balance texture, durability, and finish for everyday luxury.',
    },
    {
      title: 'Turnkey Delivery',
      copy: 'From concept to handover, our team manages every milestone.',
    },
  ];
}
