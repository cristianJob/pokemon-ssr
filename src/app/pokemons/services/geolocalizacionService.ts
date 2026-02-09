import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient) {}

  getPosition(): Observable<GeolocationPosition> {
    return new Observable(observer => {
      if (!navigator.geolocation) {
        observer.error('Geolocalización no soportada');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          observer.next(position);
          observer.complete();
        },
        error => observer.error(error)
      );

    });

  }

  getAddress(lat: number, lng: number): Observable<any> {

    const url = `
https://nominatim.openstreetmap.org/reverse
?format=json
&lat=${lat}
&lon=${lng}
&zoom=18
&addressdetails=1
`;

    return this.http.get(url);
  }


  getPositionWithAddress(): Observable<any> {
    return this.getPosition().pipe(
      switchMap(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        return this.getAddress(lat, lng);
      })
    );
  }
  
}
