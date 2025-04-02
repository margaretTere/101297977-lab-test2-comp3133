import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Launch } from '../models/launch.model';

@Injectable({
  providedIn: 'root'
})
export class MissionDataService {
  private baseUrl = 'https://api.spacexdata.com/v3/launches';

   constructor(private http: HttpClient) {}

   getAllLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(this.baseUrl);
  }

  getLaunchesByYear(year: string): Observable<Launch[]> {
    return this.http.get<Launch[]>(`${this.baseUrl}?launch_year=${year}`);
  }

  getLaunchByFlightNumber(id: number): Observable<Launch> {
    return this.http.get<Launch>(`${this.baseUrl}/${id}`);
  }

  getFilteredLaunches(
    year: string, 
    launchSuccess: string, 
    landingSuccess: string): Observable<Launch[]> {

    let params = new HttpParams();

    if (year !== '0') {
      params = params.set('launch_year', year);
    }

    if (launchSuccess.length > 2) {
      params = params.set('launch_success', launchSuccess);
    }

    if (landingSuccess.length > 2) {
      params = params.set('land_success', landingSuccess);
    }

    return this.http.get<Launch[]>(this.baseUrl, { params });
  }
}