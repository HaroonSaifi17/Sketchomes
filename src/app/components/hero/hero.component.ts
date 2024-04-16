import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit{
  public selectImg: number = 0;

  ngOnInit() {
    setInterval(() => {
      if (this.selectImg == 1) {
        this.selectImg = 0;
      }
      else{
      this.selectImg = this.selectImg + 1;
      }
    },5000);
  }
}
