import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
    {path:'',component:AuthLayoutComponent,canActivate:[logedGuard],children:[
        {path:'',redirectTo:'login',pathMatch:'full'},

        {path:'login',component:LoginComponent},
        {path:'register',component:RegisterComponent},
        {path:'forgot',component:ForgotpasswordComponent}



    ]},
    {path:'',component:BlankLayoutComponent,children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent,canActivate:[authGuard]},
        {path:'products',component:ProductsComponent,canActivate:[authGuard]},
        {path:'cart',component:CartComponent,canActivate:[authGuard]},
        {path:'wish',component:WishlistComponent,canActivate:[authGuard]},

        {path:'brands',component:BrandsComponent,canActivate:[authGuard]},
        {path:'categories',component:CategoriesComponent,canActivate:[authGuard]},
        {path:'details/:id',component:ProductDetailsComponent,canActivate:[authGuard]},
        {path:'allorders',component:AllOrdersComponent,canActivate:[authGuard]},
        {path:'orders/:id',component:OrdersComponent,canActivate:[authGuard]},





    ]},
    {path:'**',component:NotfoundComponent}

];
