import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { invironment } from '../environments/invironment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  tokenHeaders:any=localStorage.getItem('userToken')
  constructor(private _HttpClient:HttpClient) { }
  ordersPayment(idOfCart:string |null,data:object):Observable<any>{
    return this._HttpClient.post(`${invironment.baseUrl}/api/v1/orders/checkout-session/${idOfCart}?url=${invironment.serverUrl}`,{
      "shippingAddress":data
    },
    // {
    //   headers:{
    //     token:this.tokenHeaders
    //   }
    // }
  )
  }
}
