import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _Router=inject(Router)


  allProductsOfCart:Icart={} as Icart
cartnumOfCartItems:number=0
  ngOnInit(): void {
    this._CartService.getProductsOfCart().subscribe({
next:(res)=>{
  console.log(res)
  this.cartnumOfCartItems=res.numOfCartItems
this.allProductsOfCart=res.data
}
    })
  }



  callremovecart(id:string){
this._CartService.deleteProductsOfCart(id).subscribe({
  next:(res)=>{
    console.log(res)
    this.allProductsOfCart=res.data
    this._CartService.cartNumber.next(res.numOfCartItems)
  }
})

  }

  callupdatecountcart(id:string,count:number){
    this._CartService.updateProductCartCount(id,count).subscribe({
      next:(res)=>{
        console.log(res)
        this.allProductsOfCart=res.data
      }
    })

  }
  clearCart(){
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message=="success"){
          this.allProductsOfCart={}as Icart;
          this._ToastrService.success('You remove all products in cart successfully')
          this._Router.navigate(['/home'])
          this._CartService.cartNumber.next(0)
        }
      }
    })
  }
}
