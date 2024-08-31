import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrdersService=inject(OrdersService)
  private readonly _Router=inject(Router)


  cartId:string |null=''
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
next:(res)=>{
  this.cartId=res.get('id');
}
  })
}

  onlinePayment:FormGroup=new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),

  })

  handelchecksubmit(){
this._OrdersService.ordersPayment(this.cartId,this.onlinePayment.value).subscribe({
next:(res)=>{
console.log(res)
if(res.status=="success"){
window.open(res.session.url,'_self')
}

}
})
  }
}
