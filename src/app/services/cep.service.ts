import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ICEP } from 'src/models/CEP';

@Injectable({
    providedIn: 'root'
})
export class CepService {

    private CEP_URL: string = 'https://viacep.com.br/ws'

    constructor(
        private http: HttpClient
    ){}

    public getAddress(cep: string): Observable<ICEP> {
        return this.http.get<ICEP>(`${this.CEP_URL}/${cep}/json`)
            .pipe(retry(3),
            catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        if(error.status) {
          return throwError(() => new Error('Erro ' + error.status));
        }
        else return throwError(() => new Error('Something went bad, try again later. ' + error.status));
      }
}    