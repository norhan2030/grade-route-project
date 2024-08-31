import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { invironment } from '../environments/invironment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }
  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${invironment.baseUrl}/api/v1/categories`)
  }
  getSpecificCategories(id:string):Observable<any>{
    return this._HttpClient.get(`${invironment.baseUrl}/api/v1/categories/${id}`)
  }

}
