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

  getApiAdministrations():Observable<any>{
    return this._httpClient.get<any>('http://10.4.30.8:9877/api/JDSC/strings');
  };

  getApiAdminfiles(code: number):Observable<any>{
    return this._httpClient.get<any>(`http://10.4.30.8:9877/api/JDSC/strings/entity/${code}`);
  };

  postApiData(data: any):Observable<any>{
    return this._httpClient.post<any>('http://10.4.30.8:9877/api/JDSC/upload-excel',data);
  }
}
