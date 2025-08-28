import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  api=`${environment.apiBaseUrl}JDSC/upload-excel/`;

  apiGetEntry = `${environment.apiBaseUrl}JDSC/GetEntities`;

  apiExcelname= `${environment.apiBaseUrl}JDSC/GetExcelNameForEntity/`

  getApiAdministrations():Observable<any>{
    return this._httpClient.get<any>(this.apiGetEntry);
  };

  getApiAdminfiles(Id: number):Observable<any>{
    return this._httpClient.get<any>(this.apiExcelname + `${Id}`);
  };

  postApiData(formData: FormData, headers:any):Observable<any>{
    return this._httpClient.post<any>(this.api,formData,
      { headers,
        responseType: "json",
      });
  }
}
