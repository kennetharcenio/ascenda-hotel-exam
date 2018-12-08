import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelService } from './hotels/hotel.service';
import {NgbModule,NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { FilterHeaderComponent } from './shared/filter-header/filter-header.component';
import { Ng5SliderModule,Options } from 'ng5-slider';


@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    FilterHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng5SliderModule,
    NgbModule,
  ],
  providers: [HotelService,NgbRatingConfig, Options],
  bootstrap: [AppComponent]
})
export class AppModule { }
