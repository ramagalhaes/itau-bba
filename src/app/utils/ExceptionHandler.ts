import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function handleError(error: HttpErrorResponse) {
    if(error.status) {
      return throwError(() => new Error('Erro ' + error.status));
    }
    else return throwError(() => new Error('Something went bad, try again later. ' + error.status));
  }