import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, PatternValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  backEndError:string=""
  isLoading:boolean=false
  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)


loginForm:FormGroup = this._FormBuilder.group({
  // name:this._FormBuilder.control(null),
  // email:this._FormBuilder.control(null),
  // password:this._FormBuilder.control(null),
  // rePassword:this._FormBuilder.control(null),
  // phone:this._FormBuilder.control(null),
  
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],

})
// loginForm:FormGroup=new FormGroup({
// name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
// email:new FormControl(null,[Validators.required,Validators.email]),
// password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
// rePassword:new FormControl(null),
// phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),




// },this.confirmPassword)





handelLogin(){
  
if(this.loginForm.valid){
  this.isLoading=true
this._AuthService.postLoginForm(this.loginForm.value).subscribe({
  next:(res) =>{console.log(res);
    if(res.message=='success'){
      setTimeout(() => {
        localStorage.setItem('userToken',res.token)
        this._AuthService.saveUserData()
        this._Router.navigate(['/home'])
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
  this.loginForm.markAllAsTouched()
}
}

}
