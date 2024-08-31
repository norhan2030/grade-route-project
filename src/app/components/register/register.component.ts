import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, PatternValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy{
  backEndError:string=""
  isLoading:boolean=false
  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)
  registerSubscripe!:Subscription;

registerForm:FormGroup = this._FormBuilder.group({
  // name:this._FormBuilder.control(null),
  // email:this._FormBuilder.control(null),
  // password:this._FormBuilder.control(null),
  // rePassword:this._FormBuilder.control(null),
  // phone:this._FormBuilder.control(null),
  name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
  rePassword:[null],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
},{validators:this.confirmPassword})
// registerForm:FormGroup=new FormGroup({
// name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
// email:new FormControl(null,[Validators.required,Validators.email]),
// password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
// rePassword:new FormControl(null),
// phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),




// },this.confirmPassword)

confirmPassword(g:AbstractControl){
  if(g.get('password')?.value === g.get('rePassword')?.value){
    return null

  }else{
    return {mismatch:true}
  }

}



handelRegister(){
  
if(this.registerForm.valid){
  this.isLoading=true
this.registerSubscripe= this._AuthService.postRegisterForm(this.registerForm.value).subscribe({
  next:(res) =>{console.log(res);
    if(res.message=='success'){
      setTimeout(() => {
        this._Router.navigate(['/login'])
      }, 1000);
    }
    this.isLoading=false
  },
  error:(err)=>{
    this.backEndError=err.error.message;
    this.isLoading=false
  }
  
})

}else{
  this.registerForm.markAllAsTouched()
}
}
ngOnDestroy(): void {
  this.registerSubscripe?.unsubscribe()
}
}
