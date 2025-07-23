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


  getApiData():Observable<any>{
    return this._httpClient.get<any>('');
  }

  postApiData(data: any):Observable<any>{
    return this._httpClient.post<any>('',data);
  }
}
