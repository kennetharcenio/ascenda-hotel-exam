import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelService } from './hotels/hotel.service';
import {NgbModule,NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [HotelService,NgbRatingConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
