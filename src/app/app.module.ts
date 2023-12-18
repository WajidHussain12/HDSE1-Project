import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './Services/Admin/admin.service';
import { AdminLoginService } from './Services/AdminLogin/admin-login.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ngx-image-cropper';


import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './Components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { MainComponent } from './Components/main/main.component';
// import { BooksComponent } from './AdminComponents/books/books.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductsComponent } from './Components/products/products.component';
import { RegisterComponent } from './Components/register/register.component';
import { ShoppingcartComponent } from './Components/shoppingcart/shoppingcart.component';
import { VarietyComponent } from './Components/variety/variety.component';
import { UserbooksComponent } from './Components/userbooks/userbooks.component';
import { RecipeComponent } from './Components/recipe/recipe.component';
import { AdminloginComponent } from './Components/adminlogin/adminlogin.component';
import { RouterModule, Routes } from '@angular/router';
import { DemoDashboardComponent } from './UserComponents/demo-dashboard/demo-dashboard.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    ContactComponent,
    ProductsComponent,
    ShoppingcartComponent,
    VarietyComponent,
    UserbooksComponent,
    RecipeComponent,
    AdminloginComponent,
    DemoDashboardComponent,
    CheckoutComponent



  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      // preventDuplicates: true,
      progressAnimation: 'decreasing',
      progressBar: true,
      newestOnTop: true,
      closeButton: true
      // easing:'string'
    }),

    CommonModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule
    // [RouterModule.forRoot(routes)]


  ],
  exports: [RouterModule],
  providers: [
    AdminService,
    AdminLoginService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true
    },
    ProductService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function initializeApp() {
  return () => {
    // Your initialization code here
    console.log('Application initialized');
  }
};
