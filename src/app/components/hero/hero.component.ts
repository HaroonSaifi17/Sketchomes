import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  selectImg = 0;
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      if (this.selectImg === 2) {
        this.selectImg = 0;
      } else {
        this.selectImg = this.selectImg + 1;
      }
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
