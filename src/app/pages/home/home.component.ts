import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { PhotoSphereComponent } from '../../components/photo-sphere/photo-sphere.component';
import { InfoComponent } from '../../components/info/info.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProjectTypeComponent } from '../../components/project-type/project-type.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,HeroComponent,AboutComponent, PhotoSphereComponent,InfoComponent,FooterComponent,ProjectTypeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
