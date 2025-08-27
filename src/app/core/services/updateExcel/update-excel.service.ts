import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateExcelService {

  constructor(
        private _httpClient: HttpClient
  ) {  }

  api = 'http://10.4.30.8:9877/api/JDSC/'

  getExcelData(Id: number, excelid: number, fromDate:string, endDate:string ){
    return this._httpClient.get<any>(this.api+`${Id}`+`/${excelid}`+`/${fromDate}`+`/${endDate}`);
  }
}
