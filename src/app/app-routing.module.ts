import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Components/main/main.component';

import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductsComponent } from './Components/products/products.component';
import { RecipeComponent } from './Components/recipe/recipe.component';
import { RegisterComponent } from './Components/register/register.component';
import { ShoppingcartComponent } from './Components/shoppingcart/shoppingcart.component';
import { VarietyComponent } from './Components/variety/variety.component';
import { UserbooksComponent } from './Components/userbooks/userbooks.component';
import { AdminloginComponent } from './Components/adminlogin/adminlogin.component';
import { adminauthGuard } from './Guard/AdminGuard/adminauth.guard';
import { userauthGuard } from './Guard/UseGuard/userauth.guard';
import { adminRouteCheckGuard } from './Guard/adminlogin/admin-route-check.guard';
import { userRouteCheckGuard } from './Guard/userlogin/user-route-check.guard';
import { UsersidebarComponent } from './UserComponents/usersidebar/usersidebar.component';
import { DemoDashboardComponent } from './UserComponents/demo-dashboard/demo-dashboard.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';


const routes: Routes = [

{path:"admin",canActivate:[adminauthGuard],loadChildren:()=>import('./AdminComponents/admin-module/admin-module.module').then(mod=>mod.AdminModuleModule)},

{path:"user",canActivate:[userauthGuard],loadChildren:()=>import('./UserComponents/user-module/user-module/user-module.module').then(mod=>mod.UserModuleModule)},



{ path: '', component: MainComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'login',canActivate:[userRouteCheckGuard], component: LoginComponent },
{ path: 'contactus', component: ContactComponent },
{ path: 'aboutus', component: AboutComponent },
{ path: 'userbooks', component: UserbooksComponent },
{ path: 'shoppingcart', component: ShoppingcartComponent },
{ path: 'allicecreams', component: ProductsComponent },
{ path: "variety/:id", component:VarietyComponent },
{ path: "recipe/:id", component:RecipeComponent },
{ path: "adminlogin",canActivate:[adminRouteCheckGuard], component:AdminloginComponent},
{ path: "usersidebar", component:UsersidebarComponent },
{ path: "userdemo", component:DemoDashboardComponent },
{ path: "checkout/:id", component:CheckoutComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
