import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/products';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
private readonly _ActivatedRoute=inject(ActivatedRoute)
private readonly _ProductsService=inject(ProductsService)
private readonly _CartService=inject(CartService)
private readonly _ToastrService=inject(ToastrService)


//لان الاوبجكت مينفعش اعرفه من غير ما اكتب البربيرتي جواه و عشان ما نفضلش نشوف كل بربرتي و نكتبها الحل هو As iproduct كاني بقوله اللي هو كاني حاطه كل البروبيرتي الي جوا الانترفيس برودكت
// productDetailesData:Iproduct={} as Iproduct;
productDetailesData:Iproduct |null=null;

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
next:(res)=>{
  console.log(res.get('id'))
  let id=res.get('id')
  this._ProductsService.getSpecificProduct(id).subscribe({
next:(res)=> {
  console.log(res.data)
  this.productDetailesData=res.data;
}
  })
}
  })
}







addCart(id:string){
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{console.log(res)
      this._ToastrService.success(res.message,"FreshCart")
      this._CartService.cartNumber.next(res.numOfCartItems)
    }
    
  })
}
}
