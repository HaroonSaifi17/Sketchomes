import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild('b1', { static: true }) b1!: ElementRef;
  navState = true;

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition < 2) {
      this.b1.nativeElement.style.height = '0';
    } else {
      this.b1.nativeElement.style.height = '100%';
    }
  }

  toggleNav() {
    this.navState = !this.navState;
  }

  closeNav() {
    this.navState = true;
  }
}
