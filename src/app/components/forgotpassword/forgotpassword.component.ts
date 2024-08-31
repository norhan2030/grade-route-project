import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  step:number=1;
  private readonly _AuthService=inject(AuthService)
  private readonly _Router=inject(Router)



  verfiyEmail:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })
  verfiyCode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
  })
  resetPassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  })


  handelVerfiyEmail(){
this._AuthService.emailVerfiy(this.verfiyEmail.value).subscribe({
next:(res)=>{
  if(res.statusMsg==='success'){
    this.step=2
  }
}
})
  }
  handelVerfiyCode(){
    this._AuthService.codeVerfiy(this.verfiyCode.value).subscribe({
      next:(res)=>{
        if(res.status==='Success'){
          this.step=3
        }
      }
      })
  }
  handelResetPassword(){
    let emailValue=this.verfiyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailValue)
    this._AuthService.resetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
       localStorage.setItem('userToken',res.token)
       this._AuthService.saveUserData()
       this._Router.navigate(['/home'])
      }
      })
  }
}
