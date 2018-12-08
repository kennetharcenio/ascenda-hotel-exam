import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { FilterHeader } from './filter-header.model';
import { Options, ChangeContext } from 'ng5-slider';

@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.css']
})
export class FilterHeaderComponent implements OnInit {

  @Output() filterEvent: EventEmitter<FilterHeader> = new EventEmitter();
  @Input() hotelMinValue: number;
  @Input() hotelMaxValue: number;
  @Input() minReviewRating: number;
  @Input() maxReviewRating: number;

  private priceOptions: Options;
  private ratingOptions: Options;
  private filterHeader: FilterHeader = new FilterHeader();

  constructor() { }

  ngOnInit() {
    this.renderPriceSlider();
    this.renderRatingSlider();
  }

  nameSearch(nameFilter: string) {
    this.filterHeader.name = nameFilter;
    this.filterEvent.emit(this.filterHeader);
  }

  starClick(starCount: number) {
    var starExist = this.filterHeader.starRating.includes(starCount);
    if (starExist) {
      var starIndex = this.filterHeader.starRating.indexOf(starCount, 0);
      if (starIndex > -1) {
        this.filterHeader.starRating.splice(starIndex, 1);
      }
    } else {
      this.filterHeader.starRating.push(starCount);
    }
    this.filterEvent.emit(this.filterHeader);
  }


  userChangePrice(changeContext: ChangeContext): void {
    this.filterHeader.minPrice = changeContext.value;
    this.filterHeader.maxPrice = changeContext.highValue;
    this.filterEvent.emit(this.filterHeader);

  }
  userChangeRating(changeContext: ChangeContext){
    this.filterHeader.minReviewRating = changeContext.value;
    this.filterHeader.maxReviewRating = changeContext.highValue;
    this.filterEvent.emit(this.filterHeader);
  }

  private renderPriceSlider() {
    this.filterHeader.minPrice = this.hotelMinValue;
    this.filterHeader.maxPrice = this.hotelMaxValue;

    this.priceOptions = {
      floor: this.hotelMinValue,
      ceil: this.hotelMaxValue,
      translate: (value: number): string => {
        return '$' + value;
      }
    };
  }


  private renderRatingSlider() {
    this.filterHeader.minReviewRating = this.minReviewRating;
    this.filterHeader.maxReviewRating = this.maxReviewRating;
    this.ratingOptions = {
      floor:this.minReviewRating,
      ceil: this.maxReviewRating,
      step: 0.1
    };
  }



}
