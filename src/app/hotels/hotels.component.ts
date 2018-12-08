import { Component, OnInit } from '@angular/core';

import { HotelService } from './hotel.service';
import { Hotel } from './hotel.model';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls:['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  private hotels: Array<Hotel>;

  constructor(private hotelService: HotelService,
    ratingConfig: NgbRatingConfig) {
      ratingConfig.max=10;
      ratingConfig.readonly=true;

     }

  ngOnInit() {

    this.hotelService.getHotels().subscribe(serviceHotels=>{
      console.log(serviceHotels);
      this.hotels=serviceHotels;
    });
  }

}
