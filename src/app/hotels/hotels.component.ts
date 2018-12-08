import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { HotelService } from './hotel.service';
import { Hotel } from './hotel.model';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilterHeader } from '../shared/filter-header/filter-header.model';
import { ArrayType } from '@angular/compiler/src/output/output_ast';




@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

@Output() hotelMinValue: number;
@Output() hotelMaxValue: number;

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
      this.isParentLoaded = true;
    });
  }
  
  filterChange(filterHeader: FilterHeader) {
debugger;
    this.filteredHotels = this.hotels;
    if (filterHeader.name != null) {
      this.filterByName(filterHeader.name);
    }
    if(filterHeader.starRating.length > 0){
     this.filterByStars(filterHeader.starRating);
    }   

    this.filterByPrice(filterHeader.minPrice, filterHeader.maxPrice);   
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

  private filterByStars(starsRequired:number[]){
    debugger;
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

}
