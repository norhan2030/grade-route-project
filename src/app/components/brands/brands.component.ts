import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  private readonly _BrandsService=inject(BrandsService)
 
  allbrands:any[]=[]
  ngOnInit(): void {
    // this._NgxSpinnerService.show()
  
    this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res)
        this.allbrands=res.data
      }
    })
  }
  showSrc:string="";
  showName:string="";
  showNameUpper:string="";
  flag:boolean=false
  show(src:string,name:string){
    this.showSrc=src;
    this.showName=name.toLocaleLowerCase();
    this.showNameUpper=name.charAt(0).toUpperCase() + name.slice(1);
    

  }
 

}
