import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent {
  constructor(private readonly seoService: SeoService) {
    this.seoService.update({
      title: 'Contact Sketchomes Interior Designers',
      description:
        'Contact Sketchomes for luxury residential and commercial interior design services in Gurgaon and Delhi NCR. Book your consultation today.',
      path: '/contact',
      image: '/assets/images/render.webp',
    });
  }

  name = '';
  email = '';
  phone = '';
  message = '';

  submitForm() {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.message = '';
  }
}
