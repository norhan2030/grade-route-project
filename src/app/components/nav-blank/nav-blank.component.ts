import { Component, Inject, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent {
// private 
readonly _AuthService=inject(AuthService)
// logoutBridg(){
//   this._AuthService.logout()
// }

private readonly _CartService=inject(CartService)
cartnumOfCartItems:number=0

ngOnInit(): void {
 this._CartService.getProductsOfCart().subscribe({
  next:(res)=>{
    this._CartService.cartNumber.next(res?.numOfCartItems)
    this.cartnumOfCartItems=this._CartService.cartNumber.getValue()
    console.log(res)
  }
 })
  this._CartService.cartNumber.subscribe({
    next:(data)=>{
      this.cartnumOfCartItems=data
    }
  })
}
}