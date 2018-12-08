import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { HotelService } from './hotel.service';
import { Hotel } from './hotel.model';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilterHeader } from '../shared/filter-header/filter-header.model';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

@Output() hotelMinValue: number;
@Output() hotelMaxValue: number;
@Output() minReviewRating: number;
@Output() maxReviewRating: number;

  private hotels: Array<Hotel>;
  private filteredHotels: Array<Hotel>;
  private isParentLoaded: boolean= false;

  constructor(private hotelService: HotelService,
    ratingConfig: NgbRatingConfig) {
    ratingConfig.max = 5;
    ratingConfig.readonly = true;
  }

  ngOnInit() {
    this.hotelService.getHotels().subscribe(serviceHotels => {
      this.hotels = serviceHotels;
      this.filteredHotels = serviceHotels;
      this.setHotelMinAndMaxValue();
      this.setHotelMinAndMaxRating();
      this.isParentLoaded = true;
    });
  }
  
  filterChange(filterHeader: FilterHeader) {
    this.filteredHotels = this.hotels;
    if (filterHeader.name != null) {
      this.filterByName(filterHeader.name);
    }
    if(filterHeader.starRating.length > 0){
     this.filterByStars(filterHeader.starRating);
    }   

    this.filterByPrice(filterHeader.minPrice, filterHeader.maxPrice);  
    this.filterByRating(filterHeader.minReviewRating,filterHeader.maxReviewRating); 
  }

  private filterByName(hotelName: string){
    this.filteredHotels = this.filteredHotels.filter(hotel => 
      hotel.name.toLowerCase().includes(hotelName.toLowerCase())
    );
  }

  private filterByPrice(minPrice: number, maxPrice: number){
    this.filteredHotels = this.filteredHotels.filter(hotel=>
      hotel.price >= minPrice && hotel.price <= maxPrice
      );

  }
  private filterByRating(minRating: number, maxRating: number){
    this.filteredHotels = this.filteredHotels.filter(hotel=>
      hotel.rating >= minRating && hotel.rating <= maxRating
      );

  }

  private filterByStars(starsRequired:number[]){
    this.filteredHotels = this.filteredHotels.filter(hotel=>
      starsRequired.includes( hotel.stars)
       );
  }

  private setHotelMinAndMaxValue(){
    var prices :number[]=Array.from(this.hotels, x => x.price);
    var minValue = Math.min.apply(null,prices);
    var maxValue = Math.max.apply(null,prices);

    this.hotelMinValue=minValue;
    this.hotelMaxValue=maxValue;
    
  }

  private setHotelMinAndMaxRating(){
    var ratings :number[]=Array.from(this.hotels, x => x.rating);
    var minRating = Math.min.apply(null,ratings);
    var maxRating = Math.max.apply(null,ratings);

    this.minReviewRating=minRating;
    this.maxReviewRating=maxRating;
    
  }

}
