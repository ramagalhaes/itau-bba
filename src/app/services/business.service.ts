import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IBusiness } from 'src/models/Business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private readonly BUSINESS_URL: string = 'http://localhost:3000/business';

  constructor(private http: HttpClient) { }

  public getAllBusiness(): Observable<IBusiness[]> {
    return this.http.get<IBusiness[]>(this.BUSINESS_URL).pipe(retry(3), catchError(this.handleError));
  }

  public getBusinessById(id: number): Observable<IBusiness> {
    return this.http.get<IBusiness>(`${this.BUSINESS_URL}/${id}`).pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status) {
      return throwError(() => new Error('Erro ' + error.status));
    }
    else return throwError(() => new Error('Something went bad, try again later. ' + error.status));
  }

  public updateById(id: number, body: IBusiness): Observable<any> {
    console.log(id)
    return this.http.put<any>(`${this.BUSINESS_URL}/${id}`, body).pipe(retry(3), catchError(this.handleError));
  }
}
