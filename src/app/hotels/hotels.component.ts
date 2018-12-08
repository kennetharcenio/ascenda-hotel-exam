import { Component, OnInit } from '@angular/core';

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

  private hotels: Array<Hotel>;
  private filteredHotels: Array<Hotel>;

  constructor(private hotelService: HotelService,
    ratingConfig: NgbRatingConfig) {
    ratingConfig.max = 5;
    ratingConfig.readonly = true;
    

  }

  ngOnInit() {

    this.hotelService.getHotels().subscribe(serviceHotels => {
      this.hotels = serviceHotels;
      this.filteredHotels = serviceHotels;
    });
  }
  
  filterChange(filterHeader: FilterHeader) {
    this.filteredHotels = this.hotels;
    if (filterHeader.name != null) {
      this.filterByName(filterHeader.name);
    }
    if(filterHeader.starRating.length > 0){
      this.filteredHotels = this.filteredHotels.filter(hotel=>
       filterHeader.starRating.includes( hotel.stars)
        );
    }   
  }

  private filterByName(hotelName: string){
    this.filteredHotels = this.filteredHotels.filter(hotel => 
      hotel.name.toLowerCase().includes(hotelName.toLowerCase())
    );
  }

}
