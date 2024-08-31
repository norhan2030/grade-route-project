import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
 
  private readonly _CategoriesService=inject(CategoriesService)
 
  allCategories:Icategories[]=[]
 
  
  ngOnInit(): void {
    // this._NgxSpinnerService.show()
  
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res)
        this.allCategories=res.data
      }
    })
  }
}
