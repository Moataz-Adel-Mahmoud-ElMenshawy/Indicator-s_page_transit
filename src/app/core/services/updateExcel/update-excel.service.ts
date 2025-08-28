import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateExcelService {

  constructor(
    private _httpClient: HttpClient
  ) {  }

  api = `${environment.apiBaseUrl}JDSC`

  getExcelData(header:any):Observable<any>{
    return this._httpClient.get<any>(this.api,{headers: header});
  }
}
