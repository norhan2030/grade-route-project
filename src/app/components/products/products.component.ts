import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../core/interfaces/products';
import { Subscription } from 'rxjs';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SearchPipe,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private readonly _ProductsService=inject(ProductsService)
  private readonly _ToastrService=inject(ToastrService)
private readonly _CartService=inject(CartService)

  // private readonly _NgxSpinnerService=inject(NgxSpinnerService)
  
  
  
  
  allProducts:Iproduct[]=[]
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
