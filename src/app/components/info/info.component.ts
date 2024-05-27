import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent implements AfterViewInit{
   @ViewChild('bg') bgElement!: ElementRef<HTMLDivElement>;

  constructor() {}

  ngAfterViewInit() {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const element = this.bgElement.nativeElement;
    const rect = element.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const scrollTop = window.scrollY - rect.top;
      element.style.transform = `translateY(-${scrollTop * 0.1}px)`;
    }
  }
}
