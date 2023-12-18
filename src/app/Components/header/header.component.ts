import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  flavorData: any[] = [];
  allFlavorNames: string[] = [];
  id: any[] = []
  pid: any
  cartItems: number;



  // allFlavorData: any

  constructor(private router: Router, private productService: ProductService, private cdr: ChangeDetectorRef)
  {
    this.clearUserAndCartLocal()
  }

  cartupdate: any
  ngOnInit(): void {

    this.getAlldata()
    this.id.forEach(element => {
      this.pid = element
      console.log(this.pid)
    });

    this.checkAdminLogin()
    this.checkUserLogin()
    this.getuserDetails()




    setInterval(() => {
      this.updataCart()
    })

  }




  updataCart() {
    const existingCartItemsString = localStorage.getItem('cart');
    const existingCartItems = existingCartItemsString ? JSON.parse(existingCartItemsString) : [];

    // Get the number of rows in the cart
    const numberOfRowsInCart = existingCartItems.length;
    this.cartupdate = numberOfRowsInCart
  }

  // Assuming you have an array named allFlavorData in your component
  allFlavorData: { flavor: any; id: any; }[] = [];

  getAlldata() {
    this.productService.getFlavorData().subscribe((data) => {
      this.allFlavorData = data.map((obj: { flavorName: any; recipeid: any; }) => ({ flavor: obj.flavorName, id: obj.recipeid }));
      console.log("Menu", data)
    });
  }


  isScrolledDown = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolledDown = window.scrollY > 50;
  }

  loginshow: boolean = false;
  adminlogin: boolean = true

  checkAdminLogin() {
    var loggedin = localStorage.getItem("admintoken")
    if (loggedin) {
      this.loginshow = true
      this.adminlogin = false
    }
    else {
      this.loginshow = false
      this.adminlogin = true
    }
  }

  ShowUserName: boolean = false;
  loginusername: any

  RegisterandLogin: boolean = true

  checkUserLogin() {
    var UserName = localStorage.getItem('UserName')
    this.loginusername = UserName

    if (UserName) {
      this.ShowUserName = true
      this.RegisterandLogin = false
    }
    else {
      this.ShowUserName = false
      this.RegisterandLogin = true
    }
  }

  userid: any
  getuserDetails() {
    var userloggedid = localStorage.getItem("userid")
    this.userid = userloggedid

  }


  clearUserAndCartLocal() {
    const token = localStorage.getItem('usertoken');
    const jwtHelper = new JwtHelperService();

    if (jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('UserName');
      localStorage.removeItem('cart');
      localStorage.removeItem('checkout');
      localStorage.removeItem('userid');
      localStorage.removeItem('usertoken');
    }
  }



}
