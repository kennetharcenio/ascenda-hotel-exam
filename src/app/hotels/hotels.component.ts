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
    ratingConfig.max = 10;
    ratingConfig.readonly = true;

  }

  ngOnInit() {

    this.hotelService.getHotels().subscribe(serviceHotels => {
      this.hotels = serviceHotels;
      this.filteredHotels = serviceHotels;
    });
  }
  
  filterChange(filterHeader: FilterHeader) {
    if (filterHeader.name != null) {
      this.filterByName(filterHeader.name);
    }
  }

  private filterByName(hotelName: string){
    this.filteredHotels = this.hotels.filter(hotel => 
      hotel.name.toLowerCase().includes(hotelName.toLowerCase())
    );
  }

}
