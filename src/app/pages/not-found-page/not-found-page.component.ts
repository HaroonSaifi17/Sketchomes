import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css',
})
export class NotFoundPageComponent {
  constructor(private readonly seoService: SeoService) {
    this.seoService.update({
      title: 'Page Not Found',
      description: 'The page you are looking for could not be found on Sketchomes.',
      path: '/404',
      image: '/assets/images/hero1.webp',
      noindex: true,
    });
  }
}
