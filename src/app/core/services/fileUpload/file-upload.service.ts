import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  api=`http://10.4.30.8:9877/api/JDSC/upload-excel/`;

  apiGetEntry = `http://10.4.30.8:9877/api/JDSC/GetEntities`;

  apiExcelname= `http://10.4.30.8:9877/api/JDSC/GetExcelNameForEntity/`

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
