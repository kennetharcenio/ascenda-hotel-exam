import { Component, OnInit, Output, EventEmitter, Input,ChangeDetectorRef } from '@angular/core';

import { FilterHeader } from './filter-header.model';
import { Options, ChangeContext } from 'ng5-slider';
import { DropdownItem } from '../dropdown.model';
import { StarCount } from '../starcount.model';

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

  private filterHeader: FilterHeader = new FilterHeader();
  private nameValue:string="";
  private originalHotelMinValue: number;
  private originalHotelMaxValue: number;
  private originalMinReview: number;
  private originalMaxReview: number;
  private priceOptions: Options;
  private ratingOptions: Options;
  private starCount: Array<StarCount> = [];
  private sortItems: Array<DropdownItem> = [];

  constructor(private cd : ChangeDetectorRef) { }

  ngOnInit() {
    this.renderPriceSlider();
    this.renderRatingSlider();
    this.populateSorting();
    this.populateStarCount();
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
  userChangeRating(changeContext: ChangeContext) {
    this.filterHeader.minReviewRating = changeContext.value;
    this.filterHeader.maxReviewRating = changeContext.highValue;
    this.filterEvent.emit(this.filterHeader);
  }

  private populateSorting() {

    this.sortItems = [
      new DropdownItem("priceLtoH", "Price low to high"),
      new DropdownItem("priceHtoL", "Price high to low"),
      new DropdownItem("reviewLtoH", "Review low to high"),
      new DropdownItem("reviewHtoL", "Review high to low"),
      new DropdownItem("starLtoH", "Star low to high"),
      new DropdownItem("starHtoL", "Star high to low")]
  }

  private populateStarCount(){
    this.starCount =
  [
    new StarCount(5,false),
    new StarCount(4,false),
    new StarCount(3,false),
    new StarCount(2,false),
    new StarCount(1,false)]
  }

  private renderPriceSlider() {
    this.filterHeader.minPrice = this.hotelMinValue;
    this.filterHeader.maxPrice = this.hotelMaxValue;
    this.originalHotelMinValue = this.hotelMinValue;
    this.originalHotelMaxValue = this.hotelMaxValue;

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
    this.originalMinReview = this.minReviewRating;
    this.originalMaxReview = this.maxReviewRating;

    this.ratingOptions = {
      floor: this.minReviewRating,
      ceil: this.maxReviewRating,
      step: 0.1
    };
  }

  private resetPriceSlider() {
    this.hotelMinValue = this.originalHotelMinValue;
    this.hotelMaxValue = this.originalHotelMaxValue;
    this.priceOptions = {
      floor: this.originalHotelMinValue,
      ceil: this.originalHotelMaxValue,
      translate: (value: number): string => {
        return '$' + value;
      }
    };
  }

  private resetReviewSlider() {
    this.minReviewRating = this.originalMinReview;
    this.maxReviewRating = this.originalMaxReview;

    this.ratingOptions = {
      floor: this.minReviewRating,
      ceil: this.maxReviewRating,
      step: 0.1
    };
  }

  private sortingSelect(sortingValue: string) {
    this.filterHeader.sort = sortingValue;
    this.filterEvent.emit(this.filterHeader);
  }

  private resetFilters() {
   
    this.nameValue=null;
    this.uncheckAll();
    this.resetPriceSlider();
    this.resetReviewSlider();
    this.populateSorting();
    this.filterHeader = new FilterHeader();
    this.filterEvent.emit(this.filterHeader);
  }

  private uncheckAll() {
    this.starCount.forEach(star => star.check =false);
  }


}
