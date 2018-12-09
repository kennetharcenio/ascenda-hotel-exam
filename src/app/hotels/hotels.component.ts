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

  hotels: Array<Hotel>;
  filteredHotels: Array<Hotel>;
  isParentLoaded: boolean= false;

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
      var defaultSorting ="priceLtoH";
      this.sortHotels(defaultSorting);
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
    if(filterHeader.minPrice != null){
      this.filterByPrice(filterHeader.minPrice, filterHeader.maxPrice);
    }
    if(filterHeader.minReviewRating){
      this.filterByRating(filterHeader.minReviewRating,filterHeader.maxReviewRating); 
    }

     
   
    this.sortHotels(filterHeader.sort);
  
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
    debugger;
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

  private sortHotels(sortBy:string){
    debugger;
    switch(sortBy){
      case "priceLtoH":
      this.filteredHotels.sort((p1,p2)=>p1.price-p2.price);
        break;
      case "priceHtoL":
      this.filteredHotels.sort((p1,p2)=>p2.price-p1.price);
        break;
      case "reviewLtoH":
      this.filteredHotels.sort((p1,p2)=>p1.rating-p2.rating);
        break;
      case "reviewHtoL":
      this.filteredHotels.sort((p1,p2)=>p2.rating-p1.rating);
        break;
      case "starLtoH":
      this.filteredHotels.sort((p1,p2)=>p1.stars-p2.stars);
        break;
      case "starHtoL":
      this.filteredHotels.sort((p1,p2)=>p2.stars-p1.stars);
        break;
    }
  }

}
