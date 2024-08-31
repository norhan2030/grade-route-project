import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { invironment } from '../environments/invironment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  userData:any=null
  private readonly _HttpClient=inject(HttpClient)
  private readonly _Router=inject(Router)

  postRegisterForm(data:object) :Observable<any>{
    return this._HttpClient.post(`${invironment.baseUrl}/api/v1/auth/signup`,data)

  }
  postLoginForm(data:object) :Observable<any>{
    return this._HttpClient.post(`${invironment.baseUrl}/api/v1/auth/signin`,data)

  }
  saveUserData(){
    if(localStorage.getItem('userToken')!==null){
     this.userData= jwtDecode(localStorage.getItem('userToken') !)

    }
  }
  logout():void{
    localStorage.removeItem('userToken')
    this.userData=null
    this._Router.navigate(['/login'])
  }
  emailVerfiy(data:object) :Observable<any>{
    return this._HttpClient.post(`${invironment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }
  codeVerfiy(data:object) :Observable<any>{
    return this._HttpClient.post(`${invironment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }
  resetPassword(data:object) :Observable<any>{
    return this._HttpClient.put(`${invironment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}
