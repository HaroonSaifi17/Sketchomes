import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-inquiry-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './inquiry-page.component.html',
  styleUrl: './inquiry-page.component.css',
})
export class InquiryPageComponent {
  constructor(private readonly seoService: SeoService) {
    this.seoService.update({
      title: 'Quick Inquiry | Start Your Interior Project',
      description:
        'Submit your interior design requirements to Sketchomes and get a project consultation for your home, office, retail, or hospitality space.',
      path: '/inquiry',
      image: '/assets/images/bbg.webp',
    });
  }

  fullName = '';
  city = '';
  budget = '';
  projectType = 'Residential';
  details = '';

  submitInquiry() {
    this.fullName = '';
    this.city = '';
    this.budget = '';
    this.projectType = 'Residential';
    this.details = '';
  }
}
