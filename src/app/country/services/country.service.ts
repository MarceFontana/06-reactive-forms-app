import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, filter, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);


  private _regions : string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ]

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if ( !region )  return of([])
    console.log(`Fetching countries for region: ${region}`);

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }

  getCountryByCode(code: string): Observable<Country | null> {
    if ( !code ) return of(null);
    console.log(`Fetching country with code: ${code}`);

    const url = `${this.baseUrl}/alpha/${code}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountryNameByCodeArray(countryCodes: string[]): Observable<Country[]> {
    if( !countryCodes || countryCodes.length === 0 ) return of([]);

    const countriesRequests: Observable<Country>[] = []

    countryCodes.forEach( code => {
      const request = this.getCountryByCode(code).pipe(
        filter((country): country is Country => country !== null)
      );
      countriesRequests.push(request);
    });
    return combineLatest(countriesRequests);
  }
}
