import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { invironment } from '../environments/invironment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
tokenHeaders:any=localStorage.getItem('userToken')
cartNumber:BehaviorSubject<any>=new BehaviorSubject(0);
  constructor(private _HttpClient:HttpClient) { }
  
  addProductToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${invironment.baseUrl}/api/v1/cart`,{
      "productId":id
    },
    // {
    //   headers:{
    //     token:this.tokenHeaders
    //   }
    // }
  )
  }
  getProductsOfCart():Observable<any>{
    return this._HttpClient.get(`${invironment.baseUrl}/api/v1/cart`,
    //   {
    //   headers:{
    //     token:this.tokenHeaders
    //   }
    // }
  )
  }
 deleteProductsOfCart(id:string):Observable<any>{
    return this._HttpClient.delete(`${invironment.baseUrl}/api/v1/cart/${id}`,
    //   {
    //   headers:{
    //     token:this.tokenHeaders
    //   }
    // }
  )
  }
  updateProductCartCount(id:string,count:number):Observable<any>{
    return this._HttpClient.put(`${invironment.baseUrl}/api/v1/cart/${id}`,{
      "count":count
    },
    // {
    //   headers:{
    //     token:this.tokenHeaders
    //   }
    // }
  )
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${invironment.baseUrl}/api/v1/cart`,
    //   {
    //   headers:{
    //     token:this.tokenHeaders
    //   }
    // }
  )
  }
}
