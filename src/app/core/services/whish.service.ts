import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { invironment } from '../environments/invironment';

@Injectable({
  providedIn: 'root'
})
export class WhishService {

  constructor(private _HttpClient:HttpClient) { }
  
  addProductTowishlist(id:string):Observable<any>{
    return this._HttpClient.post(`${invironment.baseUrl}/api/v1/wishlist`,{
      "productId":id
    },
    // {
    //   headers:{
    //     token:this.tokenHeaders
    //   }
    // }
  )
  }
  getProductsOfwishlist():Observable<any>{
    return this._HttpClient.get(`${invironment.baseUrl}/api/v1/wishlist`,
    //   {
    //   headers:{
    //     token:this.tokenHeaders
    //   }
    // }
  )
  }
  deleteProductsOfwishlist(id:string):Observable<any>{
    return this._HttpClient.delete(`${invironment.baseUrl}/api/v1/wishlist/${id}`,
    //   {
    //   headers:{
    //     token:this.tokenHeaders
    //   }
    // }
  )
  }
}
