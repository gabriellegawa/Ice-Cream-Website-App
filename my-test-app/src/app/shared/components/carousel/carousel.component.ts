import { Component, OnInit, Input } from '@angular/core';
import { carousel } from '../../../models/carousel'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  
  @Input()
  itemLists: any[] = []

  carouselItemLists: carousel[] = []

  constructor() { }

  ngOnInit(): void {
    console.log(this.itemLists)

    for (let i = 0; i < this.itemLists.length; i++) {
      this.carouselItemLists[i] = new carousel(this.itemLists[0])
      console.log(this.carouselItemLists[i])
    }
    
  }

  onItemChange($event: any): void {
    // console.log('Carousel onItemChange', $event);
  }
}
