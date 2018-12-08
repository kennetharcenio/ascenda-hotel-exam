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
  private filterHeader: FilterHeader= new FilterHeader();

  constructor() { }

  ngOnInit() {
  }

  nameSearch(nameFilter: string){
    this.filterHeader.name = nameFilter;
    this.filterEvent.emit(this.filterHeader);
  }

}
