import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FilterHeader } from './filter-header.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.css']
})
export class FilterHeaderComponent implements OnInit {

  @Output() filterEvent: EventEmitter<FilterHeader> = new EventEmitter();
  private filterHeader: FilterHeader = new FilterHeader();

  constructor() { }

  ngOnInit() {

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
}
