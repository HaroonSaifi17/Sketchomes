import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild('b1', { static: true }) b1!: ElementRef;
  public navState: boolean = true;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition < 2) {
      this.b1.nativeElement.style.height = '0';
    } else {
      this.b1.nativeElement.style.height = '100%';
    }
  }
}
