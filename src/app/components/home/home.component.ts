import { Component, ElementRef, Inject, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/products';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WhishService } from '../../core/services/whish.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,FormsModule,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit ,OnDestroy{
private readonly _ProductsService=inject(ProductsService)
private readonly _CategoriesService=inject(CategoriesService)
private readonly _CartService=inject(CartService)
private readonly _WhishService=inject(WhishService)

private readonly _ToastrService=inject(ToastrService)
// private readonly _NgxSpinnerService=inject(NgxSpinnerService)

constructor(@Inject(DOCUMENT) private document: Document) { }


allProducts:Iproduct[]=[]
allCategories:Icategories[]=[]
getAllProductSub !:Subscription;
searchTerm:string=''


ngOnInit(): void {
  // this._NgxSpinnerService.show()
 this.getAllProductSub= this._ProductsService.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res.data )
      this.allProducts=res.data 
      // this._NgxSpinnerService.hide()
    }
  });
  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res)
      this.allCategories=res.data
    }
  })
 
}
ngOnDestroy(): void {
  this.getAllProductSub?.unsubscribe()
}





customOptionsCategories: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}
customOptionsmain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  // autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  nav: true
}





addCart(id:string){
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{console.log(res)
      this._ToastrService.success(res.message,"FreshCart")
      this._CartService.cartNumber.next(res.numOfCartItems)
    }
    
  })
  
}
@ViewChild('icon') icon!:ElementRef;
// allWishHearts:any[]=[]
addWishlist(id:string,event:any ){

  this._WhishService.addProductTowishlist(id).subscribe({
    next:(res)=>{console.log(res)
      
      event.target.classList.toggle('red')
      // this.allWishHearts.push(event.target)
      this._ToastrService.success(res.message,"FreshCart")
     
    }
    
  })
}




  


}
