import { Component, inject } from '@angular/core';
import { WhishService } from '../../core/services/whish.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  private readonly _WhishService = inject(WhishService);
  private readonly _CartService = inject(CartService);

  private readonly _ToastrService = inject(ToastrService);

  allProductsOfWish: any[] = [];
  cartnumOfCartItems: number = 0;
  ngOnInit(): void {
    this._WhishService.getProductsOfwishlist().subscribe({
      next: (res) => {
        console.log(res.data);
        //   this.cartnumOfCartItems=res.numOfCartItems
        this.allProductsOfWish = res.data;
      },
    });
  }

  addCart(id: string) {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'FreshCart');
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
    });
  }
  callremovecart(id: string) {
    this._WhishService.deleteProductsOfwishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.allProductsOfWish = res.data;
      },
    });
  }
}
