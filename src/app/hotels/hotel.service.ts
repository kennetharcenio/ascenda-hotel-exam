import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';


import { Hotel } from './hotel.model';
import { Observable } from 'rxjs/Rx';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/Rx';

@Injectable()
export class HotelService {


    constructor(private http: HttpClient) { }

    getHotels(): Observable<Array<Hotel>> {
        var getHotelEndpoint = "https://5c08f37bea3172001389ccbd.mockapi.io/hotels/en";
       
        return this.http.get<Array<Hotel>>(getHotelEndpoint).map(httpResponse => {

            var hotels = this.assignHotelsProperly(httpResponse);
            return hotels;
        
        })  .catch((error: HttpErrorResponse) => {
            return _throw(error.statusText);
        });;
    }

    private assignHotelsProperly(hotelsParam:any):Array<Hotel>{
        var hotels: Array<Hotel> =[];
        
        hotelsParam.forEach(hotel => {
            hotels.push(
                new Hotel(
                    hotel.id,
                    hotel.name,
                    hotel.rating,
                    hotel.stars,
                    hotel.address,
                    hotel.photo,
                    hotel.price,
                    hotel.description)
                );
        });
        return hotels;
    }

}