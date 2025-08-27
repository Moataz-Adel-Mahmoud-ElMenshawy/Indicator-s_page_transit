import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateExcelService {

  constructor(
    private _httpClient: HttpClient
  ) {  }

  api = 'http://10.4.30.8:9877/api/JDSC'

  getExcelData(header:any):Observable<any>{
    return this._httpClient.get<any>(this.api,header);
  }
}
